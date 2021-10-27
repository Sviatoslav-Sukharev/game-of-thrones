import axios from "axios";
import { IBook } from "../../types/types";
import { fetchBooksStart, fetchBooksError, fetchBooksSuccess, onLeftBooksPage } from "../reducers/booksSlice";
import { AppDispatch } from "../store";

export const fetchBooks = async (dispatch: AppDispatch, page: number, name: string, fromReleaseDate: string, toReleaseDate: string) => {
  try {
    dispatch(fetchBooksStart());
    const response = await axios.get<IBook[]>("https://anapioficeandfire.com/api/books", {
      params: { page, name, fromReleaseDate, toReleaseDate },
    });

    setTimeout(() => {
      if(response.data.length === 0 && page > 1) {
        dispatch(onLeftBooksPage());
        return;
      }
      dispatch(fetchBooksSuccess(response.data));
    }, 200);
  } catch(e) {
    setTimeout(() => {
      dispatch(fetchBooksError("При загрузке книг произошла ошибка"));
    }, 200);
  }
}