import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../types/types";

interface BookState {
  book: IBook | null;
  isLoading: boolean;
  error: string;
}

const initialState: BookState = {
  book: null,
  isLoading: false,
  error: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    fetchBookStart(state: BookState) {
      state.isLoading = true;
      state.error = "";
    },
    fetchBookSuccess(state: BookState, action: PayloadAction<IBook>) {
      state.isLoading = false;
      state.book = action.payload;
    },
    fetchBookError(state: BookState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = "";
    },
  },
});

export default bookSlice.reducer;
export const {fetchBookError, fetchBookStart, fetchBookSuccess} = bookSlice.actions;