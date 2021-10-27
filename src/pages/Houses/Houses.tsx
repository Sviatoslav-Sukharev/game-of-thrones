import React, { useEffect } from "react";
import { useHistory } from "react-router";
import BtnLink from "../../components/BtnLink/BtnLink";
import Card from "../../components/Card/Card";
import PageSlider from "../../components/PageSlider/PageSlider";
import SearchInput from "../../components/SearchInput/SearchInput";
import Page from "../../containers/Page/Page";
import { getIndexFromUrl, isInList } from "../../helpers/helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchHouses } from "../../store/actions/housesActions";
import { addHouse, deleteHouse } from "../../store/reducers/favouritesSlice";
import { clearHousesName, onLeftHousesPage, onRightHousesPage, setHousesName } from "../../store/reducers/housesSlice";
import { addRecentsItem } from "../../store/reducers/recentsSlice";
import "./Houses.css";

const Houses: React.FC = () => {
  const history = useHistory();
  const {houses, currentPage, isLoading, error, name} = useAppSelector(state => state.houses);
  const favourites = useAppSelector(state => state.favourites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearHousesName());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchHouses(dispatch, currentPage, name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, name]);

  if(isLoading) {
    return (
      <Page>
        <div className="Houses">
          <SearchInput setName={setHousesName} />
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
        <div className="Houses">
          <SearchInput setName={setHousesName} />
          <div className="Houses__fail">{error}</div>
        </div>
        <BtnLink path="/" title="На главную" />
      </Page>
    );
  }

  return (
    <Page>
      <div className="Houses">
        <SearchInput setName={setHousesName} />
        <div className="Houses__container">
          {
            !houses.length && <div className="Houses__fail">По вашему запросу ничего не найдено</div>
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
                isActive={isInList(house.url, favourites.houses)}
              />  
            )
          }
        </div>
      </div>
      <BtnLink path="/" title="На главную" />
      {
        !!houses.length && <PageSlider onLeftPage={() => dispatch(onLeftHousesPage())} onRightPage={() => dispatch(onRightHousesPage())} currentPage={currentPage} />
      }
    </Page>
  );
}

export default Houses;