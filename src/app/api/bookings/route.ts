import { createErrorResponse } from '@/app/api/common';
import { usePrismaInRoute } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';

export interface PostBookingRequest {
    musicianId: number;
    userName: string;
    requestService: string;
    bookedDate: string;
}

export async function POST(req: Request) {
    return usePrismaInRoute(async (prisma) => {
        const body = (await req.json()) as PostBookingRequest;

        const errResponse = validatePostRequest(body);
        if (errResponse) {
            return errResponse;
        }

        // find musician
        const musician = await prisma.musician.findUnique({
            where: {
                id: body.musicianId,
            },
            include: {
                services: true,
            },
        });

        if (!musician) {
            return createErrorResponse(
                'musician not found',
                HttpStatusCode.NotFound
            );
        }

        // check if the musician is available on the requested date
        const musicianBooking = await prisma.booking.findFirst({
            where: {
                musicianId: body.musicianId,
                bookedDate: new Date(body.bookedDate),
            },
        });

        if (musicianBooking) {
            return createErrorResponse(
                'musician is not available on the requested date',
                HttpStatusCode.BadRequest
            );
        }

        // create booking
        await prisma.booking.create({
            data: {
                musicianId: body.musicianId,
                userName: body.userName,
                requestService: body.requestService,
                bookedDate: new Date(body.bookedDate),
                createdDate: new Date(),
            },
        });

        return Response.json({});
    });
}

function validatePostRequest(body: PostBookingRequest) {
    if (!body.musicianId || !body.userName || !body.requestService) {
        return createErrorResponse(
            'invalid request',
            HttpStatusCode.BadRequest
        );
    }

    if (!body.bookedDate) {
        return createErrorResponse('invalid date', HttpStatusCode.BadRequest);
    }

    return null;
}
