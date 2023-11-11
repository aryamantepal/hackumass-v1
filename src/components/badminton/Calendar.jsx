import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const BookingCalendar = () => {
    const [events, setEvents] = useState([]);

    const handleSelect = ({ start, end }) => {
        const title = window.prompt('Enter booking details:');
        if (title) {
            const newEvent = {
                start: moment(start).toDate(),
                end: moment(end).toDate(),
                title,
            };
            setEvents([...events, newEvent]);
        }
    };

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelect}
                style={{ height: '100%' }}
                defaultView="week"
                views={['week']}
                step={60} // Set the time slot interval to 60 minutes (1 hour)
                timeslots={1} // Display one timeslot per hour
                min={moment().hour(8).minute(0).toDate()} // Set the minimum time to 8 AM
                max={moment().hour(22).minute(0).toDate()} // Set the maximum time to 10 PM
            />
        </div>
    );
};

export default BookingCalendar;
