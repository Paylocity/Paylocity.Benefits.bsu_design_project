import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PlanDetailsActivity from './PlanDetailsActivity';
import PlanDetailsAccount from './PlanDetailsAccount';
import './App.css';

const view = {
    ACTIVITY: 0,
    ACCOUNT_DETAILS: 2
};

const PlanDetails = ({plan}) => {
    const [currentView, setCurrentView] = useState(view.ACTIVITY);

    const back = function () {
        ReactDOM.render(<App />, document.getElementById('root'));
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
            {(function () {
                if(currentView == view.ACTIVITY) return (
                    <div>
                        <div id="Plan-switch">
                            <button className="Selection-button Selected">Activity</button>
                            <button
                            className="Selection-button"
                            onClick={() => setCurrentView(view.ACCOUNT_DETAILS)}>Account Details</button>
                        </div>
                        <hr/>
                        <PlanDetailsActivity/>
                    </div>
                );
                else if(currentView == view.ACCOUNT_DETAILS) return (
                    <div>
                        <div id="Plan-switch">
                            <button
                            className="Selection-button"
                            onClick={() => setCurrentView(view.ACTIVITY)}>Activity</button>
                            <button className="Selection-button Selected">Account Details</button>
                        </div>
                        <hr/>
                        <PlanDetailsAccount/>
                    </div>
                );
            })()}
        </div>
    );
}

export default PlanDetails;