import { MusicianAvailabilityResponse } from '@/app/api/musicians/[id]/availability/route';
import axios from 'axios';

export const getMusicianAvailability = async (musicianId: number) => {
    return axios
        .get<MusicianAvailabilityResponse>(
            `/api/musicians/${musicianId}/availability`
        )
        .then((res) => res.data);
};
