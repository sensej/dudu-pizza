import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategoryId: 0,
  sortType: {
    name: "популярности (возр.)",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategoryId(state, action) {
      state.activeCategoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
  },
});

export const { setActiveCategoryId, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
