import { useEffect, useState } from 'react';
import './TrafficLIght.css'

export default function TrafficLight() {
    const colorTemplate = {
        red: {next:"yellow",duration:3000},
        yellow: {next:"green",duration:1000},
        green: {next:"red",duration:2000},
    }

    const [activeColor, setActiveColor] = useState<string>("red");

    useEffect(() => {
        const {next, duration} = colorTemplate[activeColor];
        const timerId = setTimeout(() => {
            setActiveColor(next);
        },duration);

        return () => clearTimeout(timerId);
    },[activeColor]);

    return (
        <>
        <div className='traffic-light-wrapper'>
            <h2>Traffic Light</h2>
            <div className='traffic-light'>
                <div className={`circle ${activeColor === "red" ? "red-on" : ""}`}>
                </div>
                <div className={`circle ${activeColor === "yellow" ? "yellow-on" : ""}`}>
                </div>
                <div className={`circle ${activeColor === "green" ? "green-on" : ""}`}>
                </div>
            </div>
        </div>
        </>
    );
}