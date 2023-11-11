import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import './index.css'
import bad from '../badminton/badminton.jpg'
import Calendly from './calendly.jsx';
import SchedulingComponent from './cals/cal';

const BadmintonScene = () => {
    const [showCalendar1, setShowCalendar1] = useState(false);
    const [showCalendar2, setShowCalendar2] = useState(false);
    const [showCalendar3, setShowCalendar3] = useState(false);
    const handleClick = (calendarNumber) => {
        if (calendarNumber === 1) {
            setShowCalendar1(!showCalendar1);
            setShowCalendar2(false);
            setShowCalendar3(false);
            console.log("1")
        } else if (calendarNumber === 2) {
            setShowCalendar1(false);
            setShowCalendar2(!showCalendar2);
            setShowCalendar3(false);
            console.log("2")
        } else if (calendarNumber === 3) {
            setShowCalendar1(false);
            setShowCalendar2(false);
            setShowCalendar3(!showCalendar3);
            console.log("3")
        }
    };
    return (
        <div>
            <h1>Badminton Courts</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            </div>
            <div className="court" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <div className="courts" onClick={() => handleClick(1)}>
                    <img
                        src={bad}
                        alt="Badminton Court"
                        width="150px"
                        height="250px"
                    />
                    <div>Court 1</div>
                </div>

                <div className="courts" onClick={() => handleClick(2)}>
                    <img
                        src={bad}
                        alt="Badminton Court"
                        width="150px"
                        height="250px"
                    />
                    <div>Court 2</div>
                </div>

                <div className="courts" onClick={() => handleClick(3)}>
                    <img
                        src={bad}
                        alt="Badminton Court"
                        width="150px"
                        height="250px"
                    />
                    <div>Court 3</div>
                </div>

                {/* {showCalendar && (
                    <div>
                        <Calendar />
                    </div>
                )} */}
                {showCalendar1 && <SchedulingComponent />}
                {showCalendar2 && <SchedulingComponent />}
                {showCalendar3 && <SchedulingComponent />}
            </div>
        </div>
    )
}

export default BadmintonScene