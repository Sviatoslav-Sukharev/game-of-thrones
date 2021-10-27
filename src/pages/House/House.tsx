import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BtnLink from "../../components/BtnLink/BtnLink";
import Page from "../../containers/Page/Page";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchHouse } from "../../store/actions/houseAction";
import "./House.css";

const House: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const {house, error, isLoading} = useAppSelector(state => state.house);

  useEffect(() => {
    fetchHouse(dispatch, id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(isLoading) {
    return (
      <Page>
        <div className="House">
          <div className="cssload-container">
            <div className="cssload-speeding-wheel"></div>
          </div>
        </div>
        <BtnLink path="/houses" title="Назад" />
      </Page>
    );
  }

  if(error) {
    return (
      <Page>
        <div className="House">
          <div className="House__fail">{error}</div>
        </div>
        <BtnLink path="/houses" title="Назад" />
      </Page>
    );
  }

  return (
    <Page>
      <div className="House">
        <h1 className="House__title">{house?.name}</h1>
        <h2 className="House__subtitle">{house?.region}</h2>

        <div className="House__row">
          <strong>Герб: </strong>
          {house?.coatOfArms} 
        </div>

        <div className="House__row">
          <strong>Девиз: </strong>
          {house?.words} 
        </div>

        <div className="House__row">
          <strong>Основан: </strong>
          {house?.founded} 
        </div>

        <div className="House__row">
          <strong>Титулы: </strong>
          {house?.titles.join(", ")} 
        </div>

        <div className="House__row">
          <strong>Место: </strong>
          {house?.seats.join(", ")} 
        </div>

      </div>
      <BtnLink path="/houses" title="Назад" />
    </Page>
  );
}

export default House;