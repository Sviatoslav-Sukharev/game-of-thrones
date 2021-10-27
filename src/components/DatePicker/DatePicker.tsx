import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import "./DatePicker.css";

interface DatePickerProps {
  setDate(str: string): PayloadAction<string>;
}

const DatePicker: React.FC<DatePickerProps> = ({setDate}) => {
  const dispatch = useAppDispatch();

  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      dispatch(setDate(e.currentTarget.value));
    }
  }

  return (
    <input className="DatePicker" type="date" onKeyPress={enterHandler}/>
  );
}

export default DatePicker;