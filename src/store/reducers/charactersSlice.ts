import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gender } from "../../components/GenderSelect/GenderSelect";
import { ICharacter } from "../../types/types";

interface charactersState {
  characters: ICharacter[],
  currentPage: number;
  isLoading: boolean;
  error: string;
  name: string;
  gender: Gender;
}

const initialState: charactersState = {
  characters: [],
  currentPage: 1,
  isLoading: false,
  error: "",
  name: "",
  gender: Gender.any,
};

const charactersSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetchCharactersStart(state: charactersState) {
      state.isLoading = true;
      state.error = "";
    },
    fetchCharactersSuccess(state: charactersState, action: PayloadAction<ICharacter[]>) {
      state.isLoading = false;
      state.characters = action.payload;
    },
    fetchCharactersError(state: charactersState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    onRightCharactersPage(state) {
      state.currentPage = state.currentPage + 1;
    },
    onLeftCharactersPage(state) {
      if(state.currentPage !== 1) {
        state.currentPage = state.currentPage - 1;
      }
    },
    setCharactersName(state: charactersState, action: PayloadAction<string>) {
      state.name = action.payload;
      state.currentPage = 1;
    },
    setCharactersGender(state: charactersState, action: PayloadAction<Gender>) {
      state.gender = action.payload;
    },
    clearCharacters(state: charactersState) {
      state.name = "";
      state.gender = Gender.any;
    }
  }
});

export default charactersSlice.reducer;
export const {fetchCharactersError, fetchCharactersStart, fetchCharactersSuccess, onRightCharactersPage, onLeftCharactersPage, setCharactersName, clearCharacters, setCharactersGender} = charactersSlice.actions;