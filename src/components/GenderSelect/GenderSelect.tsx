import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import "./GenderSelect.css";

interface GenderSelectProps {
  setGender(str: string): PayloadAction<string>;
}

export enum Gender {
  male = "male",
  female = "female",
  any = "",
}

const GenderSelect: React.FC<GenderSelectProps> = ({setGender}) => {
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGender(e.currentTarget.value));
  }

  return (
    <select className="GenderSelect" onChange={changeHandler}>
      <option value={Gender.any}>Все</option>
      <option value={Gender.male}>Мужчины</option>
      <option value={Gender.female}>Женщины</option>
    </select>
  );
}

export default GenderSelect;