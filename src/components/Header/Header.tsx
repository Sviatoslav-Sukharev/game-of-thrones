import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./Header.css";

const Header: React.FC = () => {
  const {amountOfItems} = useAppSelector(state => state.favourites);

  return (
    <div className="Header">
      <NavLink to="/books" className="Header__item" activeClassName="Header__item_active">
        Книги
      </NavLink>
      <NavLink to="/characters" className="Header__item" activeClassName="Header__item_active">
        Персонажи
      </NavLink>
      <NavLink to="/houses" className="Header__item" activeClassName="Header__item_active">
        Дома / Семьи
      </NavLink>
      <NavLink to="/favourites" className="Header__item" activeClassName="Header__item_active">
        Избранное
        <div className="Header__fav-number">{amountOfItems}</div>
      </NavLink>
    </div>
  );
}

export default Header;