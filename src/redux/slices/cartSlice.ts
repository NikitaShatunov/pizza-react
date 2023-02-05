import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getJSONcart } from "../../utils/getJSONcart";

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliseState {
  totalPrice: number;
  items: CartItemType[];
}
const { items, totalPrice } = getJSONcart();

const initialState: CartSliseState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItemType>) {
      //находит только одинаковые товары
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    plusItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        if (obj.count === 0) {
          state.items = state.items.filter(
            (obj) =>
              obj.id !== action.payload.id ||
              obj.id !== action.payload.id ||
              obj.type !== action.payload.type ||
              obj.size !== action.payload.size
          );
        }
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItems(state, action: PayloadAction<CartItemType>) {
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.id !== action.payload.id ||
          obj.type !== action.payload.type ||
          obj.size !== action.payload.size
      );
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItems, removeItems, clearItems, plusItem, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
