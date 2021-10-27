import React, { useEffect } from "react";
import { useParams } from "react-router";
import BtnLink from "../../components/BtnLink/BtnLink";
import Page from "../../containers/Page/Page";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchBook } from "../../store/actions/bookActions";
import "./Book.css";

const Book: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const {book, error, isLoading} = useAppSelector(state => state.book);

  useEffect(() => {
    fetchBook(dispatch, id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(isLoading) {
    return (
      <Page>
        <div className="Book">
          <div className="cssload-container">
            <div className="cssload-speeding-wheel"></div>
          </div>
        </div>
        <BtnLink path="/books" title="Назад" />
      </Page>
    );
  }

  if(error) {
    return (
      <Page>
        <div className="Book">
          <div className="Book__fail">{error}</div>
        </div>
        <BtnLink path="/books" title="Назад" />
      </Page>
    );
  }

  return (
    <Page>
      <div className="Book">
        <h1 className="Book__title">{book?.name}</h1>
        <h2 className="Book__subtitle">
          {book?.authors.join(", ")}
        </h2>

        <div className="Book__row">
          <strong>Число страниц: </strong>
          {book?.numberOfPages} 
        </div>

        <div className="Book__row">
          <strong>Издатель: </strong>
          {book?.publisher} 
        </div>

        <div className="Book__row">
          <strong>Страна: </strong>
          {book?.country} 
        </div>

        <div className="Book__row">
          <strong>Дата выпуска: </strong>
          {book?.released.slice(0, 10)} 
        </div>

      </div>
      <BtnLink path="/books" title="Назад" />
    </Page>
  );
}

export default Book;