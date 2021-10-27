import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHouse } from "../../types/types";

interface housesState {
  houses: IHouse[];
  currentPage: number;
  error: string;
  isLoading: boolean;
  name: string;
}

const initialState: housesState = {
  houses: [],
  currentPage: 1,
  error: "",
  isLoading: false,
  name: "",
};

const housesSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetchHousesStart(state: housesState) {
      state.isLoading = true;
      state.error = "";
    },
    fetchHousesSuccess(state: housesState, action: PayloadAction<IHouse[]>) {
      state.isLoading = false;
      state.houses = action.payload;
    },
    fetchHousesError(state: housesState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    onRightHousesPage(state: housesState) {
      state.currentPage = state.currentPage + 1;
    },
    onLeftHousesPage(state: housesState) {
      if(state.currentPage !== 1) {
        state.currentPage = state.currentPage - 1;
      }
    },
    setHousesName(state: housesState, action: PayloadAction<string>) {
      state.name = action.payload;
      state.currentPage = 1;
    },
    clearHousesName(state: housesState) {
      state.name = "";
    }
  }
});

export default housesSlice.reducer;
export const {fetchHousesError, fetchHousesStart, fetchHousesSuccess, onLeftHousesPage, onRightHousesPage, setHousesName, clearHousesName} = housesSlice.actions;