import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import "./SearchInput.css";

interface SearchInputProps {
  setName(str: string): PayloadAction<string>;
}

const SearchInput: React.FC<SearchInputProps> = ({setName}) => {
  const dispatch = useAppDispatch();

  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      dispatch(setName(e.currentTarget.value));
    }
  }

  return (
    <input type="text" className="SearchInput" placeholder="Поиск" onKeyPress={enterHandler} />
  );
}

export default SearchInput;