import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../types/types";

interface booksState {
  books: IBook[],
  currentPage: number;
  isLoading: boolean;
  error: string;
  name: string;
  toReleaseDate: string;
  fromReleaseDate: string;
}

const initialState: booksState = {
  books: [],
  currentPage: 1,
  isLoading: false,
  error: "",
  name: "",
  toReleaseDate: "",
  fromReleaseDate: "",
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetchBooksStart(state: booksState) {
      state.isLoading = true;
      state.error = "";
    },
    fetchBooksSuccess(state: booksState, action: PayloadAction<IBook[]>) {
      state.isLoading = false;
      state.books = action.payload;
    },
    fetchBooksError(state: booksState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    onRightBooksPage(state) {
      state.currentPage = state.currentPage + 1;
    },
    onLeftBooksPage(state) {
      if(state.currentPage !== 1) {
        state.currentPage = state.currentPage - 1;
      }
    },
    setBooksName(state: booksState, action: PayloadAction<string>) {
      state.name = action.payload;
      state.currentPage = 1;
    },
    setBooksFromReleaseDate(state: booksState, action: PayloadAction<string>) {
      state.fromReleaseDate = action.payload;
    },
    setBooksToReleaseDate(state: booksState, action: PayloadAction<string>) {
      state.toReleaseDate = action.payload;
    },
    clearBooks(state: booksState) {
      state.name = "";
      state.fromReleaseDate = "";
      state.toReleaseDate = "";
    },
  }
});

export default booksSlice.reducer;
export const {fetchBooksStart, fetchBooksError, fetchBooksSuccess, onLeftBooksPage, onRightBooksPage, setBooksName, clearBooks, setBooksFromReleaseDate, setBooksToReleaseDate} = booksSlice.actions;