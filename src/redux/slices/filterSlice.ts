import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum SortTypes {
  RATING_ASK = "rating",
  RATING_DESC = "-rating",
  PRICE_ASK = "price",
  PRICE_DESC = "-price",
  TITLE_ASK = "title",
  TITLE_DESC = "-title",
}

type Sort = {
  name: string;
  sortProperty: SortTypes;
};

interface FilterSliceState {
  searchValue: string;
  activeCategoryId: number;
  sortType: Sort;
}

const initialState: FilterSliceState = {
  searchValue: "",
  activeCategoryId: 0,
  sortType: {
    name: "популярности (возр.)",
    sortProperty: SortTypes.RATING_ASK,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategoryId(state, action: PayloadAction<number>) {
      state.activeCategoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.activeCategoryId = Number(action.payload.activeCategoryId);
      state.sortType = action.payload.sortType;
    },
  },
});

export const { setActiveCategoryId, setSearchValue, setSortType, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
