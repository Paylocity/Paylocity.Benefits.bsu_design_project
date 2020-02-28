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

  if(currentPage == pages.COVERAGE) return (
    <div className="App">
      <header>
        <span id="Menu">Menu</span>
        <span>Benefits</span>
      </header>
      <Coverage plan={eligible.plan}/>
      <footer>
        <button className="Current-selection">Coverage</button>
        <button onClick={() => setCurrentPage(pages.EXTRAS)}>Extras</button>
      </footer>
    </div>
  );
  else if(currentPage == pages.EXTRAS) return (
    <div className="App">
      <header>
        <span id="Menu">Menu</span>
        <span>Benefits</span>
      </header>
      <Extras/>
      <footer>
        <button onClick={() => setCurrentPage(pages.COVERAGE)}>Coverage</button>
        <button className="Current-selection">Extras</button>
      </footer>
    </div>
  );
}

export default App;
