export interface MusicianService {
    name: string;
}

export interface Musician {
    id: number;
    name: string;
    avatar: string;
    services: MusicianService[];
}
