import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.id;
      });

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    decreaseItem(state, action) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload;
      });

      if (findItem.count > 1) {
        findItem.count--;

        state.totalPrice = state.items.reduce((sum, item) => {
          return item.price * item.count + sum;
        }, 0);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => {
        return item.id !== action.payload;
      });

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, decreaseItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
