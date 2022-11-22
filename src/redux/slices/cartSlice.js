import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
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
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    plusItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action) {
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
        if(obj.count === 0){
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
    removeItems(state, action) {
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
