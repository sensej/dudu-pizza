import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ItemCart = {
  id: number;
  title: string;
  imageUrl: string;
  count: number;
  price: number;
  size: number;
  type: string;
  rating: number;
  sizes: number[];
  types: number[];
  category: number;
};

interface CartSliceState {
  totalPrice: number;
  items: ItemCart[];
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemCart>) {
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
    decreaseItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload;
      });

      if (findItem && findItem.count) {
        if (findItem.count > 1) {
          findItem.count--;

          state.totalPrice = state.items.reduce((sum, item) => {
            return item.price * item.count + sum;
          }, 0);
        }
      }
    },
    removeItem(state, action: PayloadAction<number>) {
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
