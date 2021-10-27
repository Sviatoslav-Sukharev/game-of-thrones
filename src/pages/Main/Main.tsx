import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import Card from "../../components/Card/Card";
import Page from "../../containers/Page/Page";
import { getIndexFromUrl, isInList } from "../../helpers/helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addBook, addCharacter, addHouse, deleteBook, deleteCharacter, deleteHouse } from "../../store/reducers/favouritesSlice";
import { addRecentsItem } from "../../store/reducers/recentsSlice";
import { IBook, ICharacter, IHouse } from "../../types/types";
import "./Main.css";

const Main: React.FC = () => {
  const {recents} = useAppSelector(state => state.recents);
  const favourites = useAppSelector(state => state.favourites);
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <Page>
      <div className="Main">
        <h2 className="Main__subtitle">Фан-проект по вселенной</h2>
        <h1 className="Main__title">Игры Престолов</h1>
        <div className="Links">
          <NavLink to="/books" className="Links__item">Книги</NavLink>
          <NavLink to="/characters" className="Links__item">Персонажи</NavLink>
          <NavLink to="/houses" className="Links__item">Дома / Семьи</NavLink>
        </div>

        <h2 className="Main__recents-title">Недавно просмотренное ▼</h2>
        <div className="Main__container">
          {
            !recents.length && <div className="Main__text">Здесь пока пусто</div>
          }
          {
            // eslint-disable-next-line array-callback-return
            recents.map((item: IBook | ICharacter | IHouse) => {
              if("authors" in item) {
                return <Card 
                  key={item.url}
                  title={item.name}
                  description={`Авторы: ${item.authors.join(", ")}. Страна: ${item.country}. Кол-во страниц: ${item.numberOfPages}.`}
                  onClick={() => {
                    history.push("/books/" + getIndexFromUrl(item.url));
                    dispatch(addRecentsItem(item));
                  }}
                  onAdd={() => dispatch(addBook(item))}
                  onDelete={() => dispatch(deleteBook(item.url))}
                  isActive={isInList(item.url, favourites.books)}
                /> 
              }
              if("gender" in item) {
                return <Card 
                  key={item.url}
                  title={item.name || "Имя неизвестно"}
                  description={`Культура: ${item.culture || "неизвестно"}. Пол: ${item.gender}. ${item.died && "Персонаж мертв"}`}
                  onClick={() => {
                    history.push("/characters/" + getIndexFromUrl(item.url));
                    dispatch(addRecentsItem(item));
                  }}
                  onAdd={() => dispatch(addCharacter(item))}
                  onDelete={() => dispatch(deleteCharacter(item.url))}
                  isActive={isInList(item.url, favourites.characters)}
                />
              }
              if("coatOfArms" in item) {
                return <Card 
                  key={item.url}
                  title={item.name}
                  description={`Регион: ${item.region}. Герб: ${item.coatOfArms || "неизвестен"}.`}
                  onClick={() => {
                    history.push("/houses/" + getIndexFromUrl(item.url));
                    dispatch(addRecentsItem(item));
                  }}
                  onAdd={() => dispatch(addHouse(item))}
                  onDelete={() => dispatch(deleteHouse(item.url))}
                  isActive={isInList(item.url, favourites.houses)}
                />  
              }
            })
          }
        </div>
      </div>
    </Page>
  );
}

export default Main;