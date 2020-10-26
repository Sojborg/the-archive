import "./App.scss";
import React from "react";
import { Books } from "./views/books/Books";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
  useHistory,
} from "react-router-dom";
import { Dashboard } from "./views/dashboard/Dashboard";
import { CreateBook } from "./views/books/CreateBook";
import { Navigation } from "./helpers/navigation";
import { SearchBar } from "./components/SearchBar";
import { Search } from "./views/search/Search";
import { SearchProvider } from "./views/SearchProvider";

function App() {

  return (
    <div className={"app"}>
      <Router>
        <SearchProvider>
          <div>
            <nav className={"app__navigation"}>
              <Link to={Navigation.home} className='app__logo' />
              <ul>
                <li>
                  <Link to={Navigation.home}>Home</Link>
                </li>
                <li>
                  <Link to={Navigation.books}>Books</Link>
                </li>
              </ul>
              <SearchBar />
            </nav>
            <div className={"app__content"}>
              <Switch>
                <Route path={Navigation.books}>
                  <Books />
                </Route>
                <Route path={Navigation.newbook}>
                  <CreateBook />
                </Route>
                <Route
                  path={`${Navigation.search}/:query`}
                  render={(props: RouteComponentProps<any>) => {
                    return <Search query={props.match.params.query} />
                  } }
                ></Route>
                <Route path={Navigation.home}>
                  <Dashboard />
                </Route>
              </Switch>
            </div>
          </div>
        </SearchProvider>
      </Router>
    </div>
  );
}

export default App;
