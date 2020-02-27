import React, {useEffect, useState} from 'react';
import Coverage from './Coverage';
import './App.css';

const App = () => {
  const [eligible, setEligible] = useState([]);

  const getEligible = async () => {
    // TODO: Add eligible data
    // const response = await fetch();
    // const data = await response.json();
    // setEligible(data);
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
      <Coverage/>
      <footer>
        <span className="Current-selection">Coverage</span>
        <span>Extras</span>
      </footer>
    </div>
  );
}

export default App;
