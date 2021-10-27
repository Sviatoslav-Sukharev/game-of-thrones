import axios from "axios";
import { ICharacter } from "../../types/types";
import { fetchCharactersStart, fetchCharactersSuccess, fetchCharactersError, onLeftCharactersPage } from "../reducers/charactersSlice";
import { AppDispatch } from "../store";

export const fetchCharacters = async (dispatch: AppDispatch, page: number, name: string, gender: string) => {
  try {
    dispatch(fetchCharactersStart());
    const response = await axios.get<ICharacter[]>("https://anapioficeandfire.com/api/characters", {
      params: { page, name, gender },
    });

    setTimeout(() => {
      if(response.data.length === 0 && page > 1) {
        dispatch(onLeftCharactersPage());
        return;
      } 
      dispatch(fetchCharactersSuccess(response.data));
    }, 200);
  } catch(e) {
    setTimeout(() => {
      dispatch(fetchCharactersError("При загрузке персонажей произошла ошибка"));
    }, 200);
  }
}