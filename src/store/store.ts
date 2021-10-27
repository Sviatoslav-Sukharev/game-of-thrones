import {combineReducers, configureStore} from "@reduxjs/toolkit";
import bookSlice from "./reducers/bookSlice";
import booksSlice from "./reducers/booksSlice";
import characterSlice from "./reducers/characterSlice";
import charactersSlice from "./reducers/charactersSlice";
import favouritesSlice from "./reducers/favouritesSlice";
import houseSlice from "./reducers/houseSlice";
import housesSlice from "./reducers/housesSlice";
import recentsSlice from "./reducers/recentsSlice";

const rootReducer = combineReducers({
  books: booksSlice,
  houses: housesSlice,
  characters: charactersSlice,
  favourites: favouritesSlice,
  recents: recentsSlice,
  book: bookSlice,
  character: characterSlice,
  house: houseSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
} 

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];