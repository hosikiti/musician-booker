import { usePrisma, usePrismaInRoute } from '@/app/lib/prisma';

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
        return Response.json({ result: musicians });
    });
}
