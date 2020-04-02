import React from 'react';
import card from './test-card.jpg';

const Extras = () => {
    return(
        <div>
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
                        <div>Provider Search</div>
                    </div>
                    <div className="Card">
                        <img src={card} className="Card-img"/>
                        <div>Telemedicine</div>
                    </div>
                </div>
                <hr/>
                <div>
                    <div className="Section">Extras & Perks</div>
                    <hr/>
                    <div className="Partition Service">
                        <div>Provider Search</div>
                        <div className="Provider">Amino</div>
                    </div>
                    <hr/>
                    <div className="Partition Service">
                        <div>Telemedicine</div>
                        <div className="Provider">MDLive</div>
                    </div>
                    <hr/>
                    <div className="Partition Service">
                        <div>Employee Discount</div>
                        <div className="Provider">Paylocity</div>
                    </div>
                    <hr/>
                    <div className="Partition Service">
                        <div>Pet Care</div>
                        <div className="Provider">MetLife</div>
                    </div>
                    <hr/>
                    <div className="Partition Service">
                        <div>Wellness Reimbursement</div>
                        <div className="Provider">Paylocity</div>
                    </div>
                    <hr/>
                </div>
            </div>
        </div>
    );
}

export default Extras;