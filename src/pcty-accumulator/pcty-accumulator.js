import React, { useEffect } from 'react';
import './pcty-accumulator.css';

const PctyAccumulator = ({ id, percentage }) => {
    const calculateFill = function (width) {
        return width*(percentage);
    }

    const renderAccumulator = () => {
        const accumulator = document.getElementById(id);
        const ctx = accumulator.getContext('2d');

        ctx.fillStyle = '#249661';
        ctx.clearRect(
            0,
            0,
            accumulator.width,
            accumulator.height
        );
        ctx.fillRect(
            0, 
            0, 
            calculateFill(accumulator.width), 
            accumulator.height
        );
    }

    useEffect(() => {
        renderAccumulator();
    },[percentage]);

    return (
        <canvas id={id} className="Pcty-accumulator"/>
    );
}

export default PctyAccumulator;