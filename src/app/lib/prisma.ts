import { Prisma, PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const usePrisma = <T>(handler: (client: PrismaClient) => T) => {
    try {
        return handler(prisma);
    } catch (e) {
        throw e;
    } finally {
        prisma.$disconnect();
    }
};

export const usePrismaInRoute = (
    handler: (client: PrismaClient) => Promise<Response>
) => {
    return usePrisma(handler).catch((reason) => {
        if (reason) {
            return new Response(reason, {
                status: 400,
            });
        }

        return new Response('Internal Server Error', {
            status: 500,
        });
    });
};
