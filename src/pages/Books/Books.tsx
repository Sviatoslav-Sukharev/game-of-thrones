import React, { useEffect } from "react";
import { useHistory } from "react-router";
import BtnLink from "../../components/BtnLink/BtnLink";
import Card from "../../components/Card/Card";
import DatePicker from "../../components/DatePicker/DatePicker";
import PageSlider from "../../components/PageSlider/PageSlider";
import SearchInput from "../../components/SearchInput/SearchInput";
import Page from "../../containers/Page/Page";
import { getIndexFromUrl, isInList } from "../../helpers/helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchBooks } from "../../store/actions/booksActions";
import { clearBooks, onLeftBooksPage, onRightBooksPage, setBooksFromReleaseDate, setBooksName, setBooksToReleaseDate } from "../../store/reducers/booksSlice";
import { addBook, deleteBook } from "../../store/reducers/favouritesSlice";
import { addRecentsItem } from "../../store/reducers/recentsSlice";
import "./Books.css";

const Books: React.FC = () => {
  const history = useHistory();
  const {books, currentPage, error, isLoading, name, toReleaseDate, fromReleaseDate} = useAppSelector(state => state.books);
  const favourites = useAppSelector(state => state.favourites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearBooks());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchBooks(dispatch, currentPage, name, fromReleaseDate, toReleaseDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, name, fromReleaseDate, toReleaseDate]);

  if(isLoading) {
    return (
      <Page>
        <div className="Books">
          <div className="Books__inputs">
            <SearchInput setName={setBooksName} />
            <span>
              <span className="Books__text">От:</span>
              <DatePicker setDate={setBooksFromReleaseDate} />
              <span className="Books__text">До:</span>
              <DatePicker setDate={setBooksToReleaseDate} />
            </span>
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
        <div className="Books">
          <div className="Books__inputs">
            <SearchInput setName={setBooksName} />
            <span>
              <span className="Books__text">От:</span>
              <DatePicker setDate={setBooksFromReleaseDate} />
              <span className="Books__text">До:</span>
              <DatePicker setDate={setBooksToReleaseDate} />
            </span>
          </div>
          <div className="Books__fail">{error}</div>
        </div>
        <BtnLink path="/" title="На главную" />
      </Page>
    );
  }

  return (
    <Page>
      <div className="Books">
        <div className="Books__inputs">
          <SearchInput setName={setBooksName} />
          <span>
            <span className="Books__text">От:</span>
            <DatePicker setDate={setBooksFromReleaseDate} />
            <span className="Books__text">До:</span>
            <DatePicker setDate={setBooksToReleaseDate} />
          </span>
        </div>
        <div className="Books__container">
          {
            !books.length && <div className="Books__fail">По вашему запросу ничего не найдено</div>
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
                isActive={isInList(book.url, favourites.books)}
              />  
            )
          }
        </div>
      </div>
      <BtnLink path="/" title="На главную" />
      {
        !!books.length && <PageSlider onLeftPage={() => dispatch(onLeftBooksPage())} onRightPage={() => dispatch(onRightBooksPage())} currentPage={currentPage} />
      }
    </Page>
  );
}

export default Books;