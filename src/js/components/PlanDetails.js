import React, {useState} from 'react';
import { render } from 'react-dom';
import App from './App';
import PlanDetailsActivity from './PlanDetailsActivity';
import PlanDetailsAccount from './PlanDetailsAccount';

const view = {
    ACTIVITY: 0,
    ACCOUNT_DETAILS: 1
};

const PlanDetails = ({plan}) => {
    const [currentView, setCurrentView] = useState(view.ACTIVITY);

    const back = function () {
        render(<App />, document.getElementById('root'));
    }

    return (
        <div className="App">
            <header>
                <span 
                  className="Back-button"
                  onClick={back}>Back</span>
                <span>Plan Details</span>
            </header>
            <div className="Img-upload">
                <span>Upload photos of your medical insurance card</span>
            </div>
            <div className="Section Information">
                <div>Blue Cross Blue Shield PPO</div>
                <div className="Subtext">By Blue Cross Blue Shield</div>
                <div>
                    <a>800-555-6767</a>
                </div>
                <div>
                    <a>https://www.bcbsil.com</a>
                </div>
            </div>
            <hr/>
            <div>
                <div id="Plan-switch">
                    <button 
                      className={'Selection-button'.concat(currentView===view.ACTIVITY ? ' Selected' : '')}
                      onClick={() => setCurrentView(view.ACTIVITY)}>
                      Activity
                    </button>
                    <button
                      className={'Selection-button'.concat(currentView===view.ACCOUNT_DETAILS ? ' Selected' : '')}
                      onClick={() => setCurrentView(view.ACCOUNT_DETAILS)}>
                      Account Details
                    </button>
                </div>
                <hr/>
                {currentView===view.ACTIVITY ? <PlanDetailsActivity/> : null}
                {currentView===view.ACCOUNT_DETAILS ? <PlanDetailsAccount/> : null}
            </div>
        </div>
    );
}

export default PlanDetails;