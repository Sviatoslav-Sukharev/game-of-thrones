import React, { useEffect } from "react";
import { useHistory } from "react-router";
import BtnLink from "../../components/BtnLink/BtnLink";
import Card from "../../components/Card/Card";
import GenderSelect from "../../components/GenderSelect/GenderSelect";
import PageSlider from "../../components/PageSlider/PageSlider";
import SearchInput from "../../components/SearchInput/SearchInput";
import Page from "../../containers/Page/Page";
import { getIndexFromUrl, isInList } from "../../helpers/helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCharacters } from "../../store/actions/charactersActions";
import { clearCharacters, onLeftCharactersPage, onRightCharactersPage, setCharactersGender, setCharactersName } from "../../store/reducers/charactersSlice";
import { addCharacter, deleteCharacter } from "../../store/reducers/favouritesSlice";
import { addRecentsItem } from "../../store/reducers/recentsSlice";
import "./Characters.css";

const Characters: React.FC = () => {
  const history = useHistory();
  const {characters, currentPage, isLoading, error, name, gender} = useAppSelector(state => state.characters);
  const favourites = useAppSelector(state => state.favourites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCharacters());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchCharacters(dispatch, currentPage, name, gender);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, name, gender]);

  if(isLoading) {
    return (
      <Page>
        <div className="Characters">
          <div className="Characters__inputs">
            <SearchInput setName={setCharactersName} />
            <GenderSelect setGender={setCharactersGender} />
          </div>
          <div className="cssload-container">
            <div className="cssload-speeding-wheel"></div>
          </div>
        </div>
        <BtnLink path="/" title="На главную" />
      </Page>
    );
  }

  if(error) {
    return (
      <Page>
        <div className="Characters">
          <div className="Characters__inputs">
            <SearchInput setName={setCharactersName} />
            <GenderSelect setGender={setCharactersGender} />
          </div>
          <div className="Characters__fail">{error}</div>
        </div>
        <BtnLink path="/" title="На главную" />
      </Page>
    );
  }

  return (
    <Page>
      <div className="Characters">
        <div className="Characters__inputs">
          <SearchInput setName={setCharactersName} />
          <GenderSelect setGender={setCharactersGender} />
        </div>
        <div className="Characters__container">
          {
            !characters.length && <div className="Characters__fail">По вашему запросу ничего не найдено</div>
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
                isActive={isInList(character.url, favourites.characters)}
              />  
            )
          }
        </div>
      </div>
      <BtnLink path="/" title="На главную" />
      {
        !!characters.length && <PageSlider onLeftPage={() => dispatch(onLeftCharactersPage())} onRightPage={() => dispatch(onRightCharactersPage())} currentPage={currentPage} />
      }
    </Page>
  );
}

export default Characters;