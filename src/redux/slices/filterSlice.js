import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setFilters(state, action) {
      state.activeCategoryId = Number(action.payload.activeCategoryId);
      state.sortType = action.payload.sortType;
    },
  },
});

export const { setActiveCategoryId, setSearchValue, setSortType, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;