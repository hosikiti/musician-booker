'use client';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { getBookings } from '@/lib/apiClient/bookings/getBookings';
import { useQuery } from '@tanstack/react-query';
import * as datefns from 'date-fns';

export default function RecentBookedSessionList() {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['getRecentBookings'],
        queryFn: () => {
            return getBookings();
        },
    });

    const getDateLabel = (date: string) => {
        const f = (format: string) => {
            return datefns.format(new Date(date), format);
        };

        return `${f('hh:mm a')} on ${f('do MMMM yyyy')}`;
    };

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <div className="py-4 h-[100px] overflow-scroll">
            {data && data.bookings.length == 0 && (
                <div className="bg-white text-sm rounded-lg p-4 text-slate-500">
                    Nobody booked a session so far
                </div>
            )}
            {data && data.bookings.length > 0 && (
                <div className="flex flex-col gap-4">
                    {data.bookings.map((booking) => (
                        <div key={booking.id} className="">
                            <p className="text-sm text-slate-500">
                                {booking.userName} booked{' '}
                                {booking.musician.name}
                                {' at '}
                                {getDateLabel(booking.bookedDate)} for a{' '}
                                <span className="text-primary">
                                    {booking.requestService} Session
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
