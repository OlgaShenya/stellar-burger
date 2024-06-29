const testHost = 'http://localhost:4000/';
const details = 'Детали ингредиента';
const ingredient = 'testItem1';
const addBtn = 'Добавить';
const constructorSelector = '[data-cy=burger-constructor]';

describe('Тесты конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testHost);
  });

  it('Добавление булки', () => {
    cy.get('[data-cy=bun-ingredients]').contains(addBtn).click();
    cy.get('[data-cy=constructor-bun-top]')
      .contains(ingredient)
      .should('exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains(ingredient)
      .should('exist');
  });

  it('Добавление ингредиентов', () => {
    cy.get('[data-cy=mains-ingredients').contains(addBtn).click();
    cy.get('[data-cy=sauces-ingredients').contains(addBtn).click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('testItem2')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('testItem4')
      .should('exist');
  });
});

describe('Тесты модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testHost);
  });

  it('Открытие', () => {
    cy.contains(details).should('not.exist');
    cy.contains(ingredient).click();
    cy.contains(details).should('exist');
    cy.get('[data-cy=modal').contains(ingredient).should('exist');
  });

  it('Закрытие по клику на крестик', () => {
    cy.contains(ingredient).click();
    cy.contains(details).should('exist');
    cy.get('[data-cy=modal_close_button]').click();
    cy.contains(details).should('not.exist');
  });

  it('Закрытие по клику на оверлей', () => {
    cy.contains(ingredient).click();
    cy.contains(details).should('exist');
    cy.get('[data-cy=overlay]').click('right', { force: true });
    cy.contains(details).should('not.exist');
  });
});

describe('Тесты создания заказа и авторизации', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.visit(testHost);
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('Оформление заказа', () => {
    cy.get('[data-cy=bun-ingredients]').contains(addBtn).click();
    cy.get('[data-cy=mains-ingredients').contains(addBtn).click();
    cy.get('[data-cy=sauces-ingredients').contains(addBtn).click();
    cy.get('[data-cy=order-button').click();

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '4']
      });

    cy.get('[data-cy=order-number]').contains('8888').should('exist');
    cy.get('[data-cy=modal_close_button]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get(constructorSelector).contains(ingredient).should('not.exist');

    cy.get(constructorSelector).contains('testItem2').should('not.exist');

    cy.get(constructorSelector).contains('testItem4').should('not.exist');
  });
});
