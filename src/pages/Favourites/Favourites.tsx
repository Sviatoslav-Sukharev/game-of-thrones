import React from "react";
import { useHistory } from "react-router";
import BtnLink from "../../components/BtnLink/BtnLink";
import Card from "../../components/Card/Card";
import Page from "../../containers/Page/Page";
import { getIndexFromUrl, isInList } from "../../helpers/helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addBook, addCharacter, addHouse, deleteBook, deleteCharacter, deleteHouse } from "../../store/reducers/favouritesSlice";
import { addRecentsItem } from "../../store/reducers/recentsSlice";
import "./Favourites.css";

const Favourites: React.FC = () => {
  const history = useHistory();
  const {books, characters, houses} = useAppSelector(state => state.favourites);
  const dispatch = useAppDispatch();

  return (
    <Page>
      <div className="Favourites">
        <h2 className="Favourites__title">Книги</h2>
        <div className="Favourites__container">
          {
            !books.length && <div className="Favourites__text">Здесь пока пусто</div> 
          }
          {
            books.map(book => 
              <Card 
                key={book.url}
                title={book.name}
                description={`Авторы: ${book.authors.join(", ")}. Страна: ${book.country}. Кол-во страниц: ${book.numberOfPages}.`}
                onClick={() => {
                  history.push("/books/" + getIndexFromUrl(book.url));
                  dispatch(addRecentsItem(book));
                }}
                onAdd={() => dispatch(addBook(book))}
                onDelete={() => dispatch(deleteBook(book.url))}
                isActive={isInList(book.url, books)}
              />  
            )
          }
        </div>

        <h2 className="Favourites__title">Персонажи</h2>
        <div className="Favourites__container">
          {
            !characters.length && <div className="Favourites__text">Здесь пока пусто</div> 
          }
          {
            characters.map(character => 
              <Card 
                key={character.url}
                title={character.name || "Имя неизвестно"}
                description={`Культура: ${character.culture || "неизвестно"}. Пол: ${character.gender}. ${character.died && "Персонаж мертв"}`}
                onClick={() => {
                  history.push("/characters/" + getIndexFromUrl(character.url));
                  dispatch(addRecentsItem(character));
                }}
                onAdd={() => dispatch(addCharacter(character))}
                onDelete={() => dispatch(deleteCharacter(character.url))}
                isActive={isInList(character.url, characters)}
              />  
            )
          }
        </div>

        <h2 className="Favourites__title">Дома / Семьи</h2>
        <div className="Favourites__container">
          {
            !houses.length && <div className="Favourites__text">Здесь пока пусто</div> 
          }
          {
            houses.map(house => 
              <Card 
                key={house.url}
                title={house.name}
                description={`Регион: ${house.region}. Герб: ${house.coatOfArms || "неизвестен"}.`}
                onClick={() => {
                  history.push("/houses/" + getIndexFromUrl(house.url));
                  dispatch(addRecentsItem(house));
                }}
                onAdd={() => dispatch(addHouse(house))}
                onDelete={() => dispatch(deleteHouse(house.url))}
                isActive={isInList(house.url, houses)}
              />  
            )
          }
        </div>
      </div>
      <BtnLink path="/" title="На главную" />
    </Page>
  );
}

export default Favourites;