import React, { useState } from 'react';
import {
    useParams,
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import PlanDetailsActivity from './PlanDetailsActivity';
import PlanDetailsAccount from './PlanDetailsAccount';

const view = {
    ACTIVITY: 0,
    ACCOUNT_DETAILS: 1
};

const PlanDetails = ({ insurancePlans }) => {
    const [currentView, setCurrentView] = useState(view.ACTIVITY);
    let { id } = useParams();
    let insurancePlan = insurancePlans.find(el => el['ID'] == id);
    
    return (
        <div className="App">
            <header>
                <Link to='/coverage' className="Back-button">
                    Back
                </Link>
                <span>Plan Details</span>
            </header>
            <img src={"https://pctybsu2020.herokuapp.com/GetInsuranceCardImage.php?uip_id="+id} className="Card-main-img" />
            <div className="Section Information">
                <div>{insurancePlan ? insurancePlan['Description'] : ''}</div>
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
                {currentView===view.ACTIVITY ? <PlanDetailsActivity id={id}/> : null}
                {currentView===view.ACCOUNT_DETAILS ? <PlanDetailsAccount/> : null}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        insurancePlans: state.insurancePlans
    };
};

export default connect(
    mapStateToProps
)(PlanDetails);
