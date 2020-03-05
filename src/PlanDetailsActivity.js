import React from 'react';
import './App.css';

const PlanDetailsActivity = () => {
    return (
        <div>
            <div className="Deductible Section">
                <span>Deductible</span>
                <span className="Deductible Balance-amount">$2,000.00</span>
                <div className="Percent-bar"></div>
                <div className="Deductible Subtext">
                    <span>You are </span>
                    <span className="Deductible Subtext Amount">$359.53</span>
                    <span> away from your deductible</span>
                </div>
            </div>
            <hr/>
            <div className="Deductible Section">
                <span>Out of Pocket</span> 
                <span className="Deductible Balance-amount">$6,000.00</span>
                <div className="Percent-bar"></div>
                <div className="Deductible Subtext">
                    <span>You are </span>
                    <span className="Deductible Subtext Amount">$4,359.53</span>
                    <span> away from your out of pocket max</span>
                </div>
            </div>
            <hr/>
            <div>
                <div className="Section Wide">Claims</div>
                <hr/>
                <div className="Partition Service">
                    <span>Swanson Family Medicine</span>
                    <span className="Claim Amount">$109.92</span>
                    <div className="Claim-date">8/4/2018</div>
                </div>
                <hr/>
                <div className="Partition Service">
                    <span>Modern Day Dentistry</span>
                    <span className="Claim Amount">$39.29</span>
                    <div className="Claim-date">7/23/2018</div>
                </div>
                <hr/>
                <div className="Partition Service">
                    <span>Pediatric Associates</span>
                    <span className="Claim Amount">$201.23</span>
                    <div className="Claim-date">7/23/2018</div>
                </div>
                <hr/>
                <div className="Partition Service">
                    <span>CVS</span>
                    <span className="Claim Amount">$5.32</span>
                    <div className="Claim-date">7/1/2018</div>
                </div>
            </div>
        </div>
    );
}

export default PlanDetailsActivity;