import React, {useState} from 'react';
import {
    useParams,
    Link
} from 'react-router-dom';
import PlanDetailsActivity from './PlanDetailsActivity';
import PlanDetailsAccount from './PlanDetailsAccount';
import cameraImg from '../img/InsuranceCardPlaceholder_Camera.svg';
import './InsuranceCardPlaceholder.css';

const view = {
    ACTIVITY: 0,
    ACCOUNT_DETAILS: 1
};

const PlanDetails = () => {
    const [currentView, setCurrentView] = useState(view.ACTIVITY);
    let { id } = useParams();
    
    return (
        <div className="App">
            <header>
                <Link to='/coverage' className="Back-button">
                    Back
                </Link>
                <span>Plan Details</span>
            </header>
            <div id="InsuranceCardPlaceholder" onClick={() => "alert('insert upload prompt here');"}>
                <div id="InnerFrame">
                    <div id="Top">
                        <p>
                            <span className="HeavyText">Blue Cross Blue Shield</span>
                        </p>
                        <p>
                            <span className="HeavyText">ID Number: </span>
                            <span className="StandardText">ABC12345678</span>
                        </p>
                        <p>
                            <span className="HeavyText">Group Number: </span>
                            <span className="StandardText">DE9876</span>
                        </p>
                    </div>
                    <div id="Bottom">
                        <img id="CameraImage" src={cameraImg}/>
                        <p>
                            <span id="UploadText">Upload photos of your medical insurance card</span>
                        </p>
                    </div>
                </div>
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