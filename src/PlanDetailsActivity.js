import React, {useEffect} from 'react';
import PctyAccumulator from './pcty-accumulator/pcty-accumulator';
import './App.css';

const PlanDetailsActivity = ({
    outOfPocket = '6000.00',
    amtToOOP = '4359.53'
}) => {
    var deductibleData = {};

    const formatUSD = (amount) => {
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

    const getDeductible = async () => {
        const response = await fetch(
            `http://pctybsu2020.herokuapp.com/GetInsurancePlanFinancials.php?uip_id=2`
        );
        deductibleData = await response.json();

        console.log(deductibleData);

        document.getElementById('Deductible-total')
            .innerHTML = formatUSD(deductibleData.Deductible_Totals);
        document.getElementById('Deductible-remaining')
            .innerHTML = formatUSD(deductibleData.Deductible_Remainings);
    }

    useEffect(() => {
        getDeductible();
    }, []);

    return (
        <div>
            <div className="Deductible Section">
                <span>Deductible</span>
                <span
                  id="Deductible-total"
                  className="Deductible Balance-amount"></span>
                <PctyAccumulator
                  id="Deductible-accumulator"
                  percentage={(1-82.06/500)*100}/>
                <div className="Deductible Subtext">
                    <span>You are </span>
                    <span
                      id="Deductible-remaining"
                      className="Deductible Subtext Amount"></span>
                    <span> away from your deductible</span>
                </div>
            </div>
            <hr/>
            <div className="Deductible Section">
                <span>Out of Pocket</span> 
                <span className="Deductible Balance-amount">{formatUSD(outOfPocket)}</span>
                <PctyAccumulator
                  id="OOP-accumulator"
                  percentage={(1-amtToOOP/outOfPocket)*100}/>
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