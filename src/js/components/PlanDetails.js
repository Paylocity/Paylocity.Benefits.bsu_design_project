import React, { useState, useEffect } from 'react';
import {
    useParams,
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { getDeductible } from '../actions/index';
import PlanDetailsActivity from './PlanDetailsActivity';
import PlanDetailsAccount from './PlanDetailsAccount';

const view = {
    ACTIVITY: 0,
    ACCOUNT_DETAILS: 1
};

const PlanDetails = ({ insurancePlans, deductible }) => {
    const [currentView, setCurrentView] = useState(view.ACTIVITY);
    let { id } = useParams();
    let insurancePlan = insurancePlans.find(el => el['ID'] == id);
console.log(deductible)
    useEffect(() => {
        getDeductible(id);
    },[id]);
    
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
                <div className="Subtext">{deductible['DescriptionSubtext']}</div>
                <div>
                    <a>{deductible['DescriptionPhone']}</a>
                </div>
                <div>
                    <a href={deductible['DescriptionURL']}>{deductible['DescriptionURL']}</a>
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
                {currentView===view.ACTIVITY ? <PlanDetailsActivity deductible={deductible}/> : null}
                {currentView===view.ACCOUNT_DETAILS ? <PlanDetailsAccount/> : null}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        insurancePlans: state.insurancePlans,
        deductible: state.deductibles
    };
};

export default connect(
    mapStateToProps
)(PlanDetails);
