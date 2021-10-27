import axios from "axios";
import { ICharacter } from "../../types/types";
import { fetchCharacterError, fetchCharacterStart, fetchCharacterSuccess } from "../reducers/characterSlice";
import { AppDispatch } from "../store";

export const fetchCharacter = async (dispatch: AppDispatch, id: string) => {
  try {
    dispatch(fetchCharacterStart());
    const response = await axios.get<ICharacter>("https://anapioficeandfire.com/api/characters/" + id);
    
    setTimeout(() => {
      dispatch(fetchCharacterSuccess(response.data));
    }, 200);
  } catch(e) {
    dispatch(fetchCharacterError("Не удалось загрузить страницу"));
  }
}