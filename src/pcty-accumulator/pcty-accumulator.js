import React, { useEffect } from 'react';
import './pcty-accumulator.css';

const PctyAccumulator = ({ id, percentage }) => {
    const calculateFill = function (width) {
        return width*(percentage/100);
    }

    const renderAccumulator = function () {
        const accumulator = document.getElementById(id);
        const ctx = accumulator.getContext('2d');

        ctx.fillStyle = '#249661';
        ctx.fillRect(
            0, 
            0, 
            calculateFill(accumulator.width), 
            accumulator.height
        );
    }

    useEffect(() => {
        renderAccumulator();
    }, []);

    return (
        <canvas id={id} className="Pcty-accumulator"/>
    );
}

export default PctyAccumulator;