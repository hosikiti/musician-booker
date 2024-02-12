import { usePrismaInRoute } from '@/lib/prisma';

export interface MusicianService {
    name: string;
}

export interface Musician {
    id: number;
    name: string;
    avatar: string;
    services: MusicianService[];
}

export interface MusiciansResponse {
    result: Musician[];
}

export async function GET(request: Request) {
    return usePrismaInRoute(async (prisma) => {
        const musicians = await prisma.musician.findMany({
            where: {
                enabled: true,
            },
            include: {
                services: true,
            },
        });
        const resp: MusiciansResponse = {
            result: musicians,
        };
        return Response.json(resp);
    });
}
