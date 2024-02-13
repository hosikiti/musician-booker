import { usePrismaInRoute } from '@/lib/prisma';

export interface MusicianAvailabilityResponse {
    availableDates: string[];
}

// returns a specified musician's schedule
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    return usePrismaInRoute(async (prisma) => {
        const musicianId = parseInt(params.id);
        if (isNaN(musicianId)) {
            throw new Error('invalid id');
        }

        // check if the musician exists
        const musicianExists =
            (await prisma.musician.count({
                where: {
                    id: musicianId,
                },
            })) > 0;

        if (!musicianExists) {
            throw new Error('invalid id');
        }

        // get bookings for the user
        const bookings = await prisma.booking.findMany({
            where: {
                musicianId: musicianId,
            },
        });
        const bookedDates = bookings.map((book) =>
            book.bookedDate.toISOString()
        );
        const bookedSet = new Set(bookedDates);

        // generate dummy schedules based on the requested date
        const currentDate = new Date().toISOString().substring(0, 10);
        const dummySchedules = [
            'YYYY-MM-DDT12:15:00.000Z',
            'YYYY-MM-DDT19:15:00.000Z',
            'YYYY-MM-DDT20:15:00.000Z',
        ].map((date) => date.replace('YYYY-MM-DD', currentDate));

        // dummy schedules - booked dates are availability
        const availableDates = dummySchedules.filter(
            (date) => !bookedSet.has(date)
        );

        return Response.json({
            availableDates,
        });
    });
}
