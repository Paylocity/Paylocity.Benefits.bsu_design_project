import React from 'react';
import cameraImg from '../img/InsuranceCardPlaceholder_Camera.svg';
import './InsuranceCardPlaceholder.css';

const PctyInsuranceCard = ({ provider }) => {
    return (
        <div id="InsuranceCardPlaceholder" onClick={() => "alert('insert upload prompt here');"}>
            <div id="InnerFrame">
                <div id="Top">
                    <p>
                        <span className="HeavyText">{provider}</span>
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
    );
}

export default PctyInsuranceCard;