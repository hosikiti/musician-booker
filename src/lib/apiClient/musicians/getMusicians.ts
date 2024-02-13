import { MusiciansResponse } from '@/app/api/musicians/route';
import axios from 'axios';

export const getMusicians = async () => {
    return axios
        .get<MusiciansResponse>('/api/musicians')
        .then((res) => res.data);
};
