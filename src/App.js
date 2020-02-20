import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <span>Benefits</span>
      </header>
      <div id="view-pane">
        <div>
          <span>Open Enrollment ends Dec. 15</span>
          <span>Begin</span>
        </div>
        <div>
          <span>Coverage Date</span>
          <span>July 29, 2019</span>
        </div>
        <div id="card-cache">
          <div>
            <span>Dental</span>
          </div>
          <div>
            <span>Vision</span>
          </div>
        </div>
        <div>
          <span>Spending Accounts</span>
          <div>
            <span>Medical FSA</span>
            <span>Paylocity</span>
            <span>$2,971.44</span>
            <span>Available Balance</span>
          </div>
          <div>
            <span>Dependent Care</span>
            <span>Paylocity</span>
            <span>$1,365.02</span>
            <span>Available Balance</span>
          </div>
          <div>
            <span>Transportation</span>
            <span>Paylocity</span>
            <span>$189.27</span>
            <span>Available Balance</span>
          </div>
        </div>
        <div>
          <span>Benefits Coverage</span>
          <div>
            <span>Medical</span>
            <span>Employee + Family (6)</span>
            <span>Blue Cross Blue Shield IL</span>
          </div>
          <div>
            <span>Vision</span>
            <span>Employee + Family (6)</span>
            <span>VSP</span>
          </div>
          <div>
            <span>Employee Basic Life Insurance</span>
            <span>$80,000.00 Coverage</span>
            <span>New York Life</span>
          </div>
          <div>
            <span>Employee Short Term Disability</span>
            <span>60% - $1,307.65 Coverage</span>
            <span>Guardian</span>
          </div>
          <div>
            <span>Employee Voluntary Life Insurance</span>
            <span>$200,000.00 Coverage</span>
            <span>New York Life</span>
          </div>
          <div>
            <span>Waived Benefits</span>
            <div>
              <span>Employee Long Term Disability</span>
              <span>Guardian</span>
            </div>
          </div>
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
