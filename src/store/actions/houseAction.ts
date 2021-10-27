import axios from "axios";
import { IHouse } from "../../types/types";
import { fetchHouseError, fetchHouseStart, fetchHouseSuccess } from "../reducers/houseSlice";
import { AppDispatch } from "../store";

export const fetchHouse = async (dispatch: AppDispatch, id: string) => {
  try {
    dispatch(fetchHouseStart());
    const response = await axios.get<IHouse>("https://anapioficeandfire.com/api/houses/" + id);

    setTimeout(() => {
      dispatch(fetchHouseSuccess(response.data));
    }, 200);
  } catch(e) {
    dispatch(fetchHouseError("Не удалось загрузить страницу"));
  }
}