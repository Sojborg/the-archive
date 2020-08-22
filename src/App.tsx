import React from 'react';
import './App.css';
import { Books } from './views/books/Books';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Dashboard } from './views/dashboard/Dashboard';
import { CreateBook } from './views/books/CreateBook';
import { Navigation } from './helpers/navigation';
import { SearchBar } from './components/SearchBar';

function App() {

  return (
    <div className={'app'}>
      <Router>
      <div>
        <nav>
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
        
        <Switch>
          <Route path={Navigation.books}>
            <Books />
          </Route>
          <Route path={Navigation.newbook}>
            <CreateBook />
          </Route>
          <Route path={Navigation.home}>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
