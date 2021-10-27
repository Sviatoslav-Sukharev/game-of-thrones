import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BtnLink from "../../components/BtnLink/BtnLink";
import Page from "../../containers/Page/Page";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCharacter } from "../../store/actions/characterActions";
import "./Character.css";

const Character: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const {character, error, isLoading} = useAppSelector(state => state.character);

  useEffect(() => {
    fetchCharacter(dispatch, id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(isLoading) {
    return (
      <Page>
        <div className="Character">
          <div className="cssload-container">
            <div className="cssload-speeding-wheel"></div>
          </div>
        </div>
        <BtnLink path="/characters" title="Назад" />
      </Page>
    );
  }

  if(error) {
    return (
      <Page>
        <div className="Character">
          <div className="Character__fail">{error}</div>
        </div>
        <BtnLink path="/characters" title="Назад" />
      </Page>
    );
  }

  return (
    <Page>
      <div className="Character">
        <h1 className="Character__title">{character?.name || "Имя неизвестно"}</h1>
        <h2 className="Character__subtitle">{character?.died ? "Персонаж мертв" : "Персонаж жив"}</h2>

        <div className="Character__row">
          <strong>Пол: </strong>
          {character?.gender} 
        </div>

        <div className="Character__row">
          <strong>Культура: </strong>
          {character?.culture} 
        </div>

        <div className="Character__row">
          <strong>Родился: </strong>
          {character?.born} 
        </div>

        <div className="Character__row">
          <strong>Умер: </strong>
          {character?.died} 
        </div>

        <div className="Character__row">
          <strong>Титулы: </strong>
          {
            character?.titles.join(", ")
          } 
        </div>

        <div className="Character__row">
          <strong>Прозвища: </strong>
          {
            character?.aliases.join(", ")
          } 
        </div>

        <div className="Character__row">
          <strong>Актер(ы): </strong>
          {
            character?.playedBy.join(", ")
          } 
        </div>

      </div>
      <BtnLink path="/characters" title="Назад" />
    </Page>
  );
}

export default Character;