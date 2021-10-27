import axios from "axios";
import { IHouse } from "../../types/types";
import { fetchHousesStart, fetchHousesSuccess, fetchHousesError, onLeftHousesPage } from "../reducers/housesSlice";
import { AppDispatch } from "../store";

export const fetchHouses = async (dispatch: AppDispatch, page: number, name: string) => {
  try {
    dispatch(fetchHousesStart());
    const response = await axios.get<IHouse[]>("https://anapioficeandfire.com/api/houses", {
      params: { page, name },
    });
    
    setTimeout(() => {
      if(response.data.length === 0 && page > 1) {
        dispatch(onLeftHousesPage());
        return;
      } 
      dispatch(fetchHousesSuccess(response.data));
    }, 200);
  } catch(e) {
    setTimeout(() => {
      dispatch(fetchHousesError("При загрузке домов произошла ошибка"));
    }, 200);
  }
}