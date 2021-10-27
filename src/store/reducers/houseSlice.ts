import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHouse } from "../../types/types";

interface HouseState {
  isLoading: boolean;
  error: string;
  house: IHouse | null;
}

const initialState: HouseState = {
  isLoading: false,
  error: "",
  house: null,
};

const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    fetchHouseStart(state: HouseState) {
      state.isLoading = true;
      state.error = "";
    },
    fetchHouseSuccess(state: HouseState, action: PayloadAction<IHouse>) {
      state.isLoading = false;
      state.house = action.payload;
    },
    fetchHouseError(state: HouseState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default houseSlice.reducer;
export const {fetchHouseError, fetchHouseStart, fetchHouseSuccess} = houseSlice.actions;