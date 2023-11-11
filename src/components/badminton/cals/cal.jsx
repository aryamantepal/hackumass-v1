import React, { useState } from 'react';

const SchedulingComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // You may want to implement logic for fetching available time slots for the selected date
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        // You can add further logic here based on the selected time
    };

    const handleScheduleAppointment = () => {
        // Implement logic for scheduling the appointment, e.g., send data to a server
        console.log('Appointment scheduled:', {
            date: selectedDate.toDateString(),
            time: selectedTime,
        });

        // Reset state after scheduling
        setSelectedDate(new Date());
        setSelectedTime('');
    };

    return (
        <div>
            <h1>Schedule an Appointment</h1>

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
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                    <option value="09:00 PM">09:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                </select>
            </div>

            <button onClick={handleScheduleAppointment} disabled={!selectedDate || !selectedTime}>
                Schedule Appointment
            </button>
            <button>
                Fetch
            </button>
        </div>
    );
};

export default SchedulingComponent;
