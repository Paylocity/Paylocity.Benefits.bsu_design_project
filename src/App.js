import React, {useEffect, useState} from 'react';
import Coverage from './Coverage';
import Extras from './Extras';
import './App.css';

const pages = {
  COVERAGE: 0,
  EXTRAS:   1
}

const App = () => {
  const [eligible, setEligible] = useState([]);
  const [currentPage, setCurrentPage] = useState(pages.COVERAGE);

  const getEligible = async () => {
    // TODO: Add eligible data
    // await fetch()
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setEligible(data);
    //   });
  }

  useEffect(() => {
    getEligible();
  }, []);

  return (
    <div className="App">
      <header>
        <span id="Menu">Menu</span>
        <span>Benefits</span>
      </header>
      {(function () {
        if(currentPage == pages.COVERAGE) return (
          <div>
            <Coverage eligible={eligible}/>
            <footer>
              <span className="Current-selection">Coverage</span>
              <span onClick={() => setCurrentPage(pages.EXTRAS)}>Extras</span>
            </footer>
          </div>
        );
        else if(currentPage == pages.EXTRAS) return (
          <div>
            <Extras/>
            <footer>
              <span onClick={() => setCurrentPage(pages.COVERAGE)}>Coverage</span>
              <span className="Current-selection">Extras</span>
            </footer>
          </div>
        );
      })()}
    </div>
  );
}

export default App;