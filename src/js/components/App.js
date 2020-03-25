import React, { useState } from 'react';
import Coverage from './Coverage';
import Extras from './Extras';
import { pages } from '../constants/enums';

const mapStateToProps = state => {
  return { articles: state.articles };
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(pages.COVERAGE);

  return (
    <div className="App">
      <header>
        <span id="Menu">Menu</span>
        <span>Benefits</span>
      </header>
      {currentPage===pages.COVERAGE ? <Coverage/> : null}
      {currentPage===pages.EXTRAS ? <Extras/> : null}
      <footer>
        <span 
          className={currentPage===pages.COVERAGE ? 'Current-selection' : ''}
          onClick={() => setCurrentPage(pages.COVERAGE)}>
          Coverage
        </span>
        <span 
          className={currentPage===pages.EXTRAS ? 'Current-selection' : ''}
          onClick={() => setCurrentPage(pages.EXTRAS)}>
          Extras
        </span>
      </footer>
    </div>
  );
}

export default App;