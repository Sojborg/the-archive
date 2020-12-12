import "./App.scss";
import React from "react";
import { Books } from "./views/books/Books";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
} from "react-router-dom";
import { Dashboard } from "./views/dashboard/Dashboard";
import { CreateBook } from "./views/books/CreateBook";
import { Navigation } from "./helpers/navigation";
import { SearchBar } from "./components/SearchBar";
import { Search } from "./views/search/Search";
import { SearchProvider } from "./views/SearchProvider";
import { Login } from "./views/login/Login";
import { AppProvider } from "./AppProvider";
import { Button } from "react-md";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "./helpers/consts";

function App() {
  const logOut = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    window.location.assign('/login');
  }

  return (
    <div className={"app"}>
      <Router>
        <Switch>
          <Route exact path={Navigation.login}>
            <Login />
          </Route>
          <AppProvider>
            <SearchProvider>
              <div>
                <nav className={"app__navigation"}>
                  <Link to={Navigation.home} className="app__logo" />
                  <ul>
                    <li>
                      <Link to={Navigation.home}>Home</Link>
                    </li>
                    <li>
                      <Link to={Navigation.books}>Books</Link>
                    </li>
                  </ul>
                  <SearchBar />
                  <Button 
                    className={'app__logout__button'}
                    onClick={logOut}>Log out</Button>
                </nav>
                <div className={"app__content"}>
                  <Route path={Navigation.books}>
                    <Books />
                  </Route>
                  <Route path={Navigation.newbook}>
                    <CreateBook />
                  </Route>
                  <Route
                    path={`${Navigation.search}/:query`}
                    render={(props: RouteComponentProps<any>) => {
                      return <Search query={props.match.params.query} />;
                    }}
                  ></Route>
                  <Route path={Navigation.home}>
                    <Dashboard />
                  </Route>
                </div>
              </div>
            </SearchProvider>
          </AppProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
