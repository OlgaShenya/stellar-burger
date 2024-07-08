import {
  addIngredient,
  burgerReducer,
  initialState,
  moveIngredient,
  removeIngredient,
  resetBurger
} from '../slices/burgerSlice';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'testID')
}));

describe('Тест конструктора бургера', () => {
  const testData = [
    {
      _id: 'testID_main',
      name: 'testIngredient',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: 'testID_sauce',
      name: 'testIngredient',
      type: 'sauce',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: 'testID_bun',
      name: 'testIngredient',
      type: 'bun',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];

  it('Добавление булки', () => {
    const testState = burgerReducer(initialState, addIngredient(testData[2]));

    expect(testState.bun).toEqual({
      ...testData[2],
      id: 'testID'
    });
    expect(testState.ingredients.length).toBe(0);
  });

  it('Добавление ингредиента', () => {
    const testState = burgerReducer(initialState, addIngredient(testData[1]));

    expect(testState.ingredients.length).toBe(1);
    expect(testState.ingredients[0]).toEqual({
      ...testData[1],
      id: 'testID'
    });
  });

  it('Удаление ингредиента', () => {
    const testInitialState = {
      ...initialState,
      ingredients: [{ ...testData[1], id: 'testID' }]
    };

    const testState = burgerReducer(testInitialState, removeIngredient(0));

    expect(testState.ingredients.length).toBe(0);
  });

  const testInitialState = {
    bun: { ...testData[2], id: '1' },
    ingredients: [
      { ...testData[0], id: '2' },
      { ...testData[1], id: '3' }
    ]
  };

  it('Перемещение ингредиентов', () => {
    const testState = burgerReducer(
      testInitialState,
      moveIngredient({ currentIndex: 1, newIndex: 0 })
    );

    expect(testState.ingredients[0].id).toBe('3');
    expect(testState.ingredients[1].id).toBe('2');
  });

  it('Очистка конструктора', () => {
    const testState = burgerReducer(testInitialState, resetBurger());

    expect(testState).toEqual(initialState);
  });
});
