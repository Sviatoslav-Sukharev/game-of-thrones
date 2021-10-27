import axios from "axios";
import { IBook } from "../../types/types";
import { fetchBookError, fetchBookStart, fetchBookSuccess } from "../reducers/bookSlice";
import { AppDispatch } from "../store";

export const fetchBook = async (dispatch: AppDispatch, id: string) => {
  try { 
    dispatch(fetchBookStart());
    const response = await axios.get<IBook>("https://anapioficeandfire.com/api/books/" + id);
    
    setTimeout(() => {
      dispatch(fetchBookSuccess(response.data));
    }, 200);
  } catch(e) {
    dispatch(fetchBookError("Не удалось загрузить страницу"));
  }
}