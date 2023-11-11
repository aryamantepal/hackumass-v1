import axios from 'axios';

const url = 'http://localhost:3000/bookings';

export const createBooking = (booking) => axios.post(url, booking);