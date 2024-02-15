import { Musician } from '@/types';
import { usePrismaInRoute } from '@/lib/prisma';

export interface MusiciansResponse {
    result: Musician[];
}

// returns a list of musicians
export async function GET(request: Request) {
    return usePrismaInRoute(async (prisma) => {
        const musicians = await prisma.musician.findMany({
            where: {
                enabled: true,
            },
            include: {
                services: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
        const resp: MusiciansResponse = {
            result: musicians,
        };
        return Response.json(resp);
    });
}
