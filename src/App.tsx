import "./App.scss";
import React from "react";
import {Books} from "./views/books/Books";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Dashboard} from "./views/dashboard/Dashboard";
import {CreateBook} from "./views/books/CreateBook";
import {Navigation} from "./helpers/navigation";
import {Search} from "./views/search/Search";
import {Login} from "./views/login/Login";
import {AppProvider} from "./AppProvider";
import {AppHeader} from "./components/AppHeader";
import {QueryClient, QueryClientProvider} from "react-query";
import {Signup} from "./views/signup/Signup";

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
          <Routes>
            <Route path={'/*'} element={
              <div>
                <AppProvider>
                  <AppHeader/>
                  <div className={"app__content"}>
                    <Routes>
                    <Route path={Navigation.books} element={<Books/>}/>
                    <Route path={Navigation.newbook} element={<CreateBook/>}/>
                    <Route
                      path={`${Navigation.search}/:query`}
                      loader={() => {
                        
                      }}
                      element={(props: any) => {
                        return <Search query={props.match.params.query}/>;
                      }}
                    />
                    <Route path={Navigation.home} element={<Dashboard/>}/>
                    </Routes>
                  </div>
                </AppProvider>
              </div>
            }/>
            <Route path={`${Navigation.login}/*`} element={<Login/>}/>
            <Route path={Navigation.signup} element={<Signup/>}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
