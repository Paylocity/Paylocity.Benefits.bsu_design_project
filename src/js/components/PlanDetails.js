import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

    useEffect(() => {
        getDeductible(id);
    },[id]);
    
    function selectUploadFile(){document.getElementById('cardImage').click();}
    function submitUploadFile(){document.getElementById('submit').click();}

    return (
        <div className="App">
            <header>
                <Link to='/coverage' className="Back-button">
                    Back
                </Link>
                <span>Plan Details</span>
            </header>
            <form action={"https://pctybsu2020.herokuapp.com/UploadInsuranceCardImage.php?uip_id="+id} method="post" encType="multipart/form-data" style={{display:'none'}}>
                <input type="file" name="cardImage" id="cardImage" onChange={submitUploadFile} />
                <input type="submit" value="Upload Image" name="submit" id="submit" />
            </form>
            <img src={"https://pctybsu2020.herokuapp.com/GetInsuranceCardImage.php?uip_id="+id} className="Card-main-img" onClick={selectUploadFile} />
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
