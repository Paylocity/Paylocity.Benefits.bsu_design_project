import React from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInsurancePlans } from '../actions/index';
import PlanDetails from './PlanDetails';
import card from './test-card.jpg';

const Coverage = ({ insurancePlans }) => {
    let match = useRouteMatch();

    return(
        <Switch>
            <Route path={`${match.path}/:id`} component={PlanDetails}/>
            <Route path={match.path}>
                <header>
                    <span id="Menu">Menu</span>
                    <span>Benefits</span>
                </header>
                <div className="View">
                    <div className="Toast">
                        <span>Open Enrollment ends Dec. 15</span>
                        <button type="submit">Begin</button>
                    </div>
                    <div className="Coverage-info">
                        <span>Coverage Date</span>
                        <span id="Coverage-date">July 29, 2019</span>
                    </div>
                    <hr/>
                    <div className="Card-cache">
                        <div className="Card">
                            <img src={card} className="Card-img"/>
                            <div>Dental</div>
                        </div>
                        <div className="Card">
                            <img src={card} className="Card-img"/>
                            <div>Vision</div>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <div className="Section">Spending Accounts</div>
                        <hr/>
                        <div className="Partition">
                            <div className="Service">
                                <div>Medical FSA</div>
                                <div className="Provider">Paylocity</div>
                            </div>
                            <div className="Balance">
                                <div className="Balance-amount">$2,971.44</div>
                                <div>Available Balance</div>
                            </div>
                        </div>
                        <hr/>
                        <div className="Partition">
                            <div className="Service">
                                <div>Dependent Care</div>
                                <div className="Provider">Paylocity</div>
                            </div>
                            <div className="Balance">
                                <div className="Balance-amount">$1,365.02</div>
                                <div>Available Balance</div>
                            </div>
                        </div>
                        <hr/>
                        <div className="Partition">
                            <div className="Service">
                                <div>Transportation</div>
                                <div className="Provider">Paylocity</div>
                            </div>
                            <div className="Balance">
                                <div className="Balance-amount">$189.27</div>
                                <div>Available Balance</div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <div className="Section">Benefits Coverage</div>
                        <hr/>
                        {insurancePlans.map(el => (
                            <div key={el.ID}>
                                <Link to={`${match.url}/${el.ID}`}
                                  className='Partition Service'>
                                    <div>Something</div>
                                    <div className='Plan'>Someone</div>
                                    <div className='Provider'>{el.Description}</div>
                                </Link>
                                <hr/>
                            </div>
                        ))}
                        <Link to={`${match.url}/example`}
                        className="Partition Service">
                            <div>Medical</div>
                            <div className="Plan">Employee + Family (6)</div>
                            <div className="Provider">Blue Cross Blue Shield IL</div>
                        </Link>
                        <hr/>
                        <div className="Partition Service">
                            <div>Vision</div>
                            <div className="Plan">Employee + Family (6)</div>
                            <div className="Provider">VSP</div>
                        </div>
                        <hr/>
                        <div className="Partition Service">
                            <div>Employee Basic Life Insurance</div>
                            <div className="Plan">$80,000.00 Coverage</div>
                            <div className="Provider">New York Life</div>
                        </div>
                        <hr/>
                        <div className="Partition Service">
                            <div>Employee Short Term Disability</div>
                            <div className="Plan">60% - $1,307.65 Coverage</div>
                            <div className="Provider">Guardian</div>
                        </div>
                        <hr/>
                        <div className="Partition Service">
                            <div>Employee Voluntary Life Insurance</div>
                            <div className="Plan">$200,000.00 Coverage</div>
                            <div className="Provider">New York Life</div>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <div className="Section">Waived Benefits</div>
                        <hr/>
                        <div className="Partition Service">
                            <div>Employee Long Term Disability</div>
                            <div className="Provider">Guardian</div>
                        </div>
                    </div>
                    <hr/>
                </div>
            </Route>
        </Switch>
    );
}

const mapStateToProps = state => {
    return { insurancePlans: state.insurancePlans };
};

export default connect(
    mapStateToProps,
    { getUserInsurancePlans }
)(Coverage);