import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook, ICharacter, IHouse } from "../../types/types";

interface recentsState {
  recents: any[],
}

const initialState: recentsState = {
  recents: [],
};

const recentsSlice = createSlice({
  name: "recents",
  initialState,
  reducers: {
    addRecentsItem(state: recentsState, action: PayloadAction<IBook | ICharacter | IHouse>) {
      if(state.recents.find(item => item.url === action.payload.url)) {
        state.recents = state.recents.filter(item => item.url !== action.payload.url);
      }
      if(state.recents.length === 10) {
        state.recents.pop();
      }
      state.recents.unshift(action.payload);
    },
  },
});

export default recentsSlice.reducer;
export const {addRecentsItem} = recentsSlice.actions;