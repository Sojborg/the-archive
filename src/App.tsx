import "./App.scss";
import React, { useContext } from "react";
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
import { AppContext, AppProvider } from "./AppProvider";
import { Button, LinearProgress } from "react-md";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "./helpers/consts";
import { AppHeader } from "./components/AppHeader";

function App() {

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
                <AppHeader />
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
