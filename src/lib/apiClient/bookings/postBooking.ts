import { PostBookingRequest } from '@/app/api/bookings/route';
import axios from 'axios';

export const postBooking = async (data: PostBookingRequest) => {
    return await axios.post('/api/bookings', data);
};
