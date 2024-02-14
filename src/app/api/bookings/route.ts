import { createErrorResponse } from '@/app/api/common';
import { usePrismaInRoute } from '@/lib/prisma';
import { Booking } from '@/types';
import { HttpStatusCode } from 'axios';
import * as datefns from 'date-fns';

export interface GetBookingsRequest {
    limit: number;
    offset: number;
}

export interface GetBookingsResponse {
    bookings: Booking[];
}

const GET_BOOKINGS_DEFAULT_LIMIT = 5;
const GET_BOOKINGS_DEFAULT_OFFSET = 0;

export async function GET(request: Request) {
    return usePrismaInRoute(async (prisma) => {
        const { searchParams } = new URL(request.url);
        const offset =
            parseInt(searchParams.get('offset') || '') ||
            GET_BOOKINGS_DEFAULT_OFFSET;
        const limit =
            parseInt(searchParams.get('limit') || '') ||
            GET_BOOKINGS_DEFAULT_LIMIT;

        const bookings = await prisma.booking.findMany({
            include: {
                musician: true,
            },
            orderBy: {
                createdDate: 'desc',
            },
            skip: offset,
            take: limit,
        });

        return Response.json({
            bookings,
        });
    });
}

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

    if (!datefns.isValid(new Date(body.bookedDate))) {
        return createErrorResponse('invalid date', HttpStatusCode.BadRequest);
    }

    return null;
}
