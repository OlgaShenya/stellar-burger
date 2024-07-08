import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    moveIngredient: (state, action) => {
      const { currentIndex, newIndex } = action.payload;
      [state.ingredients[currentIndex], state.ingredients[newIndex]] = [
        state.ingredients[newIndex],
        state.ingredients[currentIndex]
      ];
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== action.payload
      );
    },
    resetBurger: (state) => (state = initialState)
  },
  selectors: {
    getBurger: (state) => state
  }
});

export const { addIngredient, moveIngredient, removeIngredient, resetBurger } =
  burgerSlice.actions;
export const { getBurger } = burgerSlice.selectors;
export const burgerReducer = burgerSlice.reducer;
