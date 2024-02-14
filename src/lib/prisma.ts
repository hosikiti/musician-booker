import { createErrorResponse } from '@/app/api/common';
import { PrismaClient } from '@prisma/client';
import { HttpStatusCode } from 'axios';

export const prisma = new PrismaClient();

// This function is used to safely handle the prisma client for a handler
export const usePrisma = <T>(handler: (client: PrismaClient) => T) => {
    try {
        return handler(prisma);
    } catch (e) {
        throw e;
    } finally {
        // disconnect whatever happens
        prisma.$disconnect();
    }
};

// This function is used to safely handle the prisma client for an API route
export const usePrismaInRoute = (
    handler: (client: PrismaClient) => Promise<Response>
) => {
    return usePrisma(handler).catch((reason) => {
        // handle unhandled errors
        if (reason) {
            return createErrorResponse(reason, HttpStatusCode.BadRequest);
        }

        return createErrorResponse(
            'internal server error',
            HttpStatusCode.InternalServerError
        );
    });
};
