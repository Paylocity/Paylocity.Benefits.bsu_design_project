import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import App from './App';
import PlanDetailsActivity from './PlanDetailsActivity';
import PlanDetailsAccount from './PlanDetailsAccount';

const view = {
    ACTIVITY: 0,
    ACCOUNT_DETAILS: 1
};

const PlanDetails = () => {
    const [currentView, setCurrentView] = useState(view.ACTIVITY);

    return (
        <div className="App">
            <header>
                <Link to='/coverage' className="Back-button">
                    Back
                </Link>
                <span>Plan Details</span>
            </header>
            <div className="Img-upload">
                <div className="Card-info">
                    <div>Blue Cross Blue Shield</div>
                    <div>
                        <span>ID Number: </span>
                        <span className="Card-number">ABC12345678</span>
                    </div>
                    <div>
                        <span>Group Number: </span>
                        <span className="Card-number">DE8976</span>
                    </div>
                </div>
                <img></img>
                <span>Upload photos of your medical insurance card</span>
            </div>
            <div className="Section Information">
                <div>Blue Cross Blue Shield PPO</div>
                <div className="Subtext">By Blue Cross Blue Shield</div>
                <div>
                    <a>800-555-6767</a>
                </div>
                <div>
                    <a href="https://www.bcbsil.com">https://www.bcbsil.com</a>
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