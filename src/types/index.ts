export interface MusicianService {
    name: string;
}

export interface Musician {
    id: number;
    name: string;
    avatar: string;
    services: MusicianService[];
}

export interface Booking {
    id: number;
    musician: {
        id: number;
        name: string;
    };
    userName: string;
    requestService: string;
    bookedDate: string;
    createdDate: string;
}
