import { HttpStatusCode } from 'axios';

export const createErrorResponse = (
    message: string,
    status: HttpStatusCode
) => {
    return new Response(message, {
        status,
    });
};
