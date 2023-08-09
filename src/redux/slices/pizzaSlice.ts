import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type SearchParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
};

type PizzaItem = {
  category: number;
  id: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, order, search } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://649a7667bf7c145d0238dd8f.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      }
    );

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
