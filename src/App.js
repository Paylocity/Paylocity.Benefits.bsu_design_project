import React from 'react';
import './App.css';
import card from './test-card.jpg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img id="Menu"/>
        <span>Benefits</span>
      </header>
      <div className="View-pane">
        <div className="Toast">
          <span>Open Enrollment ends Dec. 15</span>
          <span className="Button">Begin</span>
        </div>
        <div className="Coverage-info">
          <span>Coverage Date</span>
          <span id="Coverage-date">July 29, 2019</span>
        </div>
        <hr/>
        <div className="Card-cache">
          <div className="Card">
            <img src={card} className="Card-img"/>
            <div>Dental</div>
          </div>
          <div className="Card">
            <img src={card} className="Card-img"/>
            <div>Vision</div>
          </div>
        </div>
        <hr/>
        <div>
          <div className="Section">Spending Accounts</div>
          <hr/>
          <div className="Partition">
            <div className="Service">
              <div>Medical FSA</div>
              <div className="Provider">Paylocity</div>
            </div>
            <div className="Balance">
              <div className="Balance-amount">$2,971.44</div>
              <div>Available Balance</div>
            </div>
          </div>
          <hr/>
          <div className="Partition">
            <div className="Service">
              <div>Dependent Care</div>
              <div className="Provider">Paylocity</div>
            </div>
            <div className="Balance">
              <div className="Balance-amount">$1,365.02</div>
              <div>Available Balance</div>
            </div>
          </div>
          <hr/>
          <div className="Partition">
            <div className="Service">
              <div>Transportation</div>
              <div className="Provider">Paylocity</div>
            </div>
            <div className="Balance">
              <div className="Balance-amount">$189.27</div>
              <div>Available Balance</div>
            </div>
          </div>
        </div>
        <hr/>
        <div>
          <div className="Section">Benefits Coverage</div>
          <hr/>
          <div className="Partition">
            <span>Medical</span>
            <span>Employee + Family (6)</span>
            <span>Blue Cross Blue Shield IL</span>
          </div>
          <hr/>
          <div className="Partition">
            <span>Vision</span>
            <span>Employee + Family (6)</span>
            <span>VSP</span>
          </div>
          <hr/>
          <div className="Partition">
            <span>Employee Basic Life Insurance</span>
            <span>$80,000.00 Coverage</span>
            <span>New York Life</span>
          </div>
          <hr/>
          <div className="Partition">
            <span>Employee Short Term Disability</span>
            <span>60% - $1,307.65 Coverage</span>
            <span>Guardian</span>
          </div>
          <hr/>
          <div className="Partition">
            <span>Employee Voluntary Life Insurance</span>
            <span>$200,000.00 Coverage</span>
            <span>New York Life</span>
          </div>
          <hr/>
          <div>
            <div className="Section">Waived Benefits</div>
            <hr/>
            <div className="Partition">
              <span>Employee Long Term Disability</span>
              <span>Guardian</span>
            </div>
          </div>
          <hr/>
        </div>
      </div>
      <footer>
        <span>Coverage</span>
        <span>Extras</span>
      </footer>
    </div>
  );
}

export default App;
