'use client';
import RecentBookedSessionCard from '@/app/musicians/components/RecentBookedSessionCard';
import Alert from '@/components/alert/Alert';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { getBookings } from '@/lib/apiClient/bookings/getBookings';
import { useQuery } from '@tanstack/react-query';

export default function RecentBookedSessionList() {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['getRecentBookings'],
        queryFn: () => {
            return getBookings();
        },
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (isError) {
        return <Alert type="error">Failed to load recent bookings</Alert>;
    }

    return (
        <div className="py-4">
            {data && data.bookings.length == 0 && (
                <div className="bg-white text-sm rounded-lg p-4 text-slate-500">
                    Nobody booked a session so far
                </div>
            )}
            {data && data.bookings.length > 0 && (
                <div className="flex flex-col gap-2">
                    {data.bookings.map((booking) => (
                        <RecentBookedSessionCard
                            key={booking.id}
                            booking={booking}
                        ></RecentBookedSessionCard>
                    ))}
                </div>
            )}
        </div>
    );
}
