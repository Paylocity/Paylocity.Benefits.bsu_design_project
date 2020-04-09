import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Coverage from './Coverage';
import Extras from './Extras';
import { pages } from '../constants/enums';

const App = () => {
  const [currentPage, setCurrentPage] = useState(pages.COVERAGE);

  return (
    <Router>
      <div id="App">
        <Switch>
          <Route path='/coverage' component={Coverage}/>
          <Route path='/extras' component={Extras}/>
        </Switch>
        <footer>
          <Link to='/coverage'
            className={currentPage===pages.COVERAGE ? 'Current-selection' : ''}
            onClick={() => setCurrentPage(pages.COVERAGE)}>
            Coverage
          </Link>
          <Link to='/extras'
            className={currentPage===pages.EXTRAS ? 'Current-selection' : ''}
            onClick={() => setCurrentPage(pages.EXTRAS)}>
            Extras
          </Link>
        </footer>
      </div>
    </Router>
  );
}

export default App;