import { GetBookingsResponse } from '@/app/api/bookings/route';
import axios from 'axios';

export const getBookings = async () => {
    return axios
        .get<GetBookingsResponse>('/api/bookings')
        .then((res) => res.data);
};
