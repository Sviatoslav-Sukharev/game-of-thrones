import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook, ICharacter, IHouse } from "../../types/types";

interface favouritesState {
  books: IBook[];
  characters: ICharacter[];
  houses: IHouse[];
  amountOfItems: number;
}

const initialState: favouritesState = {
  books: [],
  characters: [],
  houses: [],
  amountOfItems: 0,
};

const favouritesSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook(state: favouritesState, action: PayloadAction<IBook>) {
      state.books.push(action.payload);
      state.amountOfItems = state.amountOfItems + 1;
    },
    deleteBook(state: favouritesState, action: PayloadAction<string>) {
      state.books = state.books.filter(book => book.url !== action.payload);
      state.amountOfItems = state.amountOfItems - 1;
    },
    addCharacter(state: favouritesState, action: PayloadAction<ICharacter>) {
      state.characters.push(action.payload);
      state.amountOfItems = state.amountOfItems + 1;
    },
    deleteCharacter(state: favouritesState, action: PayloadAction<string>) {
      state.characters = state.characters.filter(character => character.url !== action.payload);
      state.amountOfItems = state.amountOfItems - 1;
    },
    addHouse(state: favouritesState, action: PayloadAction<IHouse>) {
      state.houses.push(action.payload);
      state.amountOfItems = state.amountOfItems + 1;
    },
    deleteHouse(state: favouritesState, action: PayloadAction<string>) {
      state.houses = state.houses.filter(house => house.url !== action.payload);
      state.amountOfItems = state.amountOfItems - 1;
    }
  }
});

export default favouritesSlice.reducer;
export const {addBook, addCharacter, addHouse, deleteBook, deleteCharacter, deleteHouse} = favouritesSlice.actions;