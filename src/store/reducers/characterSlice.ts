import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICharacter } from "../../types/types";

interface CharacterState {
  isLoading: boolean,
  error: string,
  character: ICharacter | null,
}

const initialState: CharacterState = {
  isLoading: false,
  error: "",
  character: null,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    fetchCharacterStart(state: CharacterState) {
      state.isLoading = true;
      state.error = "";
    },
    fetchCharacterSuccess(state: CharacterState, action: PayloadAction<ICharacter>) {
      state.isLoading = false;
      state.character = action.payload;
    },
    fetchCharacterError(state: CharacterState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});

export default characterSlice.reducer;
export const {fetchCharacterError, fetchCharacterStart, fetchCharacterSuccess} = characterSlice.actions;