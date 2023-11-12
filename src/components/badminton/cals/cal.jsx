import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const SchedulingComponent = ({ courtNumber, bookedTimes, onBooking }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const { user } = useAuth0() || {};
    const currentDate = new Date()

    useEffect(() => {
        // Get the current time's hour and minute
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();

        // Define your time options
        const timeOptions = [
            { value: '08:00 AM', hour: 8 },
            { value: '09:00 AM', hour: 9 },
            { value: '10:00 AM', hour: 10 },
            { value: '11:00 AM', hour: 11 },
            { value: '12:00 PM', hour: 12 },
            { value: '01:00 PM', hour: 13 },
            { value: '02:00 PM', hour: 14 },
            { value: '03:00 PM', hour: 15 },
            { value: '04:00 PM', hour: 16 },
            { value: '05:00 PM', hour: 17 },
            { value: '06:00 PM', hour: 18 },
            { value: '07:00 PM', hour: 19 },
            { value: '08:00 PM', hour: 20 },
            { value: '09:00 PM', hour: 21 },
            { value: '10:00 PM', hour: 22 },
        ];

        // Filter the time options based on the current time
        const filteredTimes = timeOptions.filter(option => {
            if (selectedDate.getDate() + 1 === new Date().getDate()) {
                // If it's the current date, only include times after the current time
                console.log("current date")
                return option.hour > currentHour || (option.hour === currentHour && option.minute > currentMinute);
            } else {
                // If it's a future date, include all times
                console.log('youve reached here')
                return true;
            }
        });

        // Set the available times
        setAvailableTimes(filteredTimes);
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // You may want to implement logic for fetching available time slots for the selected date
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        // You can add further logic here based on the selected time
    };

    const handleScheduleAppointment = async () => {
        try {
            const response = await fetch('https://fastapi-backend-fl6pmqzvxq-uc.a.run.app/matches/bookings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    day: selectedDate.getDate(),
                    month: currentDate.getMonth(),
                    year: currentDate.getFullYear(),
                    start: parseInt(selectedTime),
                    end: parseInt(selectedTime) + 1,
                    court: courtNumber
                }),
            });
            if (response.ok) {
                // Request was successful
                console.log('Appointment scheduled successfully');
                console.log(availableTimes)
                // Notify parent component about the booking
                onBooking(courtNumber, `${selectedDate.toISOString().split('T')[0]} ${selectedTime}`);
            } else {
                // Handle errors
                console.error('Error scheduling appointment');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Reset state after scheduling
        setSelectedDate(new Date());
        setSelectedTime('');
    };


    return (
        <div>
            <h1>Schedule an Appointment for Court Number {courtNumber}</h1>
            <div>
                <label>Select Date:</label>
                <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                />
            </div>

            {/* Display available time slots (you may fetch this dynamically) */}
            <div>
                <label>Select Time:</label>
                <select value={selectedTime} onChange={(e) => handleTimeSelection(e.target.value)}>
                    <option value="">Select Time</option>
                    {availableTimes.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleScheduleAppointment} disabled={!selectedDate || !selectedTime || bookedTimes.includes(`${selectedDate.toISOString().split('T')[0]} ${selectedTime}`)}>
                Schedule Appointment
            </button>
        </div>
    );
};

export default SchedulingComponent;

// import React, { useState, useEffect } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";

// const SchedulingComponent = ({ courtNumber, bookedTimes, onBooking }) => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedTime, setSelectedTime] = useState('');
//     const [availableTimes, setAvailableTimes] = useState([]);
//     const { user } = useAuth0();
//     const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
//     useEffect(() => {
//         // Get the current time
//         const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

//         // Define your time options
//         const timeOptions = [
//             '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
//             '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
//             '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
//             '08:00 PM', '09:00 PM', '10:00 PM'
//         ];

//         const nums = timeOptions.map(time => parseInt(time.substring(0, 2)))


//         // Filter the time options to include only those after the current time
//         const filteredTimes = nums.filter(time => parseInt(time) > parseInt(currentTime.substring(0, 2)))
//         // Update the available times state
//         setAvailableTimes(filteredTimes);
//     }, []);

//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//         // You may want to implement logic for fetching available time slots for the selected date
//     };

//     const handleTimeSelection = (time) => {
//         setSelectedTime(time);
//         // You can add further logic here based on the selected time
//     };

//     const handleScheduleAppointment = async () => {
//         try {
//             const response = await fetch('https://fastapi-backend-fl6pmqzvxq-uc.a.run.app/matches/users', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     booked: false,
//                     email: user.email,
//                     name: user.name,
//                     date: selectedDate.toISOString().split('T')[0],
//                     time: selectedTime,
//                 }),
//             });

//             if (response.ok) {
//                 // Request was successful
//                 console.log('Appointment scheduled successfully');
//                 console.log(currentTime)
//                 temp = nums.indexOf(selectedTime)

//                 // Notify parent component about the booking
//                 onBooking(courtNumber, `${selectedDate.toISOString().split('T')[0]} ${selectedTime}`);
//             } else {
//                 // Handle errors
//                 console.error('Error scheduling appointment');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }

//         // Reset state after scheduling
//         setSelectedDate(new Date());
//         setSelectedTime('');
//     };

//     return (
//         <div>
//             <h1>Schedule an Appointment for Court Number {courtNumber}</h1>
//             <div>
//                 <label>Select Date:</label>
//                 <input
//                     type="date"
//                     value={selectedDate.toISOString().split('T')[0]}
//                     onChange={(e) => handleDateChange(new Date(e.target.value))}
//                 />
//             </div>

//             {/* Display available time slots (you may fetch this dynamically) */}
//             <div>
//                 <label>Select Time:</label>
//                 <select value={selectedTime} onChange={(e) => handleTimeSelection(e.target.value)}>
//                     <option value="">Select Time</option>
//                     {availableTimes.map((times, index) => (
//                         <option key={index} value={times}>
//                             {times}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <button onClick={handleScheduleAppointment} disabled={!selectedDate || !selectedTime || bookedTimes.includes(`${selectedDate.toISOString().split('T')[0]} ${selectedTime}`)}>
//                 Schedule Appointment
//             </button>
//         </div>
//     );
// };

// export default SchedulingComponent;
