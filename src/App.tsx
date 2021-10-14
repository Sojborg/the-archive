import "./App.scss";
import React from "react";
import {Books} from "./views/books/Books";
import {BrowserRouter as Router, Route, RouteComponentProps, Switch,} from "react-router-dom";
import {Dashboard} from "./views/dashboard/Dashboard";
import {CreateBook} from "./views/books/CreateBook";
import {Navigation} from "./helpers/navigation";
import {Search} from "./views/search/Search";
import {Login} from "./views/login/Login";
import {AppProvider} from "./AppProvider";
import {AppHeader} from "./components/AppHeader";
import {QueryClient, QueryClientProvider} from "react-query";

function App() {

  return (
    <div className={"app"}>
      <QueryClientProvider client={new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })}>
      <Router>
        <Switch>
          <Route exact path={Navigation.login}>
            <Login />
          </Route>
          <AppProvider>
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
          </AppProvider>
        </Switch>
      </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
