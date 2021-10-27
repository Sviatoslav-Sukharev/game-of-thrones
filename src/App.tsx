import React from "react";
import { Route, Switch } from "react-router-dom";
import Book from "./pages/Book/Book";
import Books from "./pages/Books/Books";
import Character from "./pages/Character/Character";
import Characters from "./pages/Characters/Characters";
import Favourites from "./pages/Favourites/Favourites";
import House from "./pages/House/House";
import Houses from "./pages/Houses/Houses";
import Main from "./pages/Main/Main";

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/books" exact component={Books} />
      <Route path="/books/:id" exact component={Book} />
      <Route path="/characters" exact component={Characters} />
      <Route path="/characters/:id" exact component={Character} />
      <Route path="/houses" exact component={Houses} />
      <Route path="/houses/:id" exact component={House} />
      <Route path="/favourites" component={Favourites} />
    </Switch>
  );
}

export default App;
