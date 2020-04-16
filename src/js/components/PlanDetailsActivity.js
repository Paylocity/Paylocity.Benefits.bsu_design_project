import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDeductible } from '../actions/index';
import PctyAccumulator from '../../pcty-accumulator/pcty-accumulator';

const PlanDetailsActivity = ({
    deductible,
    outOfPocket = '6000.00',
    amtToOOP = '4359.53'
}) => {
    const formatUSD = (amount) => {
        if(!amount) return '$0.00';

        amount = amount.split('.');
        
        let formattedString = (amount.length === 2) ?
        '.' + amount[1] : '.00';

        let separatorCount = 0;
        for(let i = amount[0].length-1; i >= 0; --i) {
            if(separatorCount === 3) {
                formattedString = ',' + formattedString;
                separatorCount = 0;
            }
            formattedString = amount[0][i] + formattedString;
            ++separatorCount;
        }

        formattedString = '$' + formattedString;

        return formattedString;
    }

    return (
        <div>
            <div className="Deductible Section">
                <span>Deductible</span>
                <span
                  id="Deductible-total"
                  className="Deductible Balance-amount">{formatUSD(deductible['Deductible_Totals'])}</span>
                <PctyAccumulator
                  id="Deductible-accumulator"
                  percentage={deductible['Deductible_Spent']/deductible['Deductible_Totals']}/>
                <div className="Deductible Subtext">
                    <span>You are </span>
                    <span
                      id="Deductible-remaining"
                      className="Deductible Subtext Amount">{formatUSD(deductible['Deductible_Remainings'])}</span>
                    <span> away from your deductible</span>
                </div>
            </div>
            <hr/>
            <div className="Deductible Section">
                <span>Out of Pocket</span> 
                <span className="Deductible Balance-amount">{formatUSD(outOfPocket)}</span>
                <PctyAccumulator
                  id="OOP-accumulator"
                  percentage={(amtToOOP/outOfPocket)}/>
                <div className="Deductible Subtext">
                    <span>You are </span>
                    <span className="Deductible Subtext Amount">{formatUSD(amtToOOP)}</span>
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