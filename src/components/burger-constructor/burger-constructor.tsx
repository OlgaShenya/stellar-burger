import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getBurger, resetBurger } from '../../services/slices/burgerSlice';
import {
  orderActions,
  orderBurger,
  orderSelectors
} from '../../services/slices/order';
import { useNavigate } from 'react-router-dom';
import { userSelectors } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(getBurger);

  const orderRequest = useSelector(orderSelectors.getOrderStatus);

  const orderModalData = useSelector(orderSelectors.getOrderData);
  const user = useSelector(userSelectors.getUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id)
      ])
    ).then(() => {
      dispatch(resetBurger());
    });
  };

  const closeOrderModal = () => {
    dispatch(orderActions.resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
