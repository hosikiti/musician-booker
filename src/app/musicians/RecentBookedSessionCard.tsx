import Alert from '@/components/alert/Alert';
import { getDateLabel, getHourLabel } from '@/lib/date';
import { Booking } from '@/types';

type RecentBookedSessionCardProps = {
    booking: Booking;
};

export default function RecentBookedSessionCard({
    booking,
}: RecentBookedSessionCardProps) {
    const dateLabel = `${getHourLabel(booking.bookedDate)} on ${getDateLabel(
        booking.bookedDate
    )}`;

    return (
        <Alert key={booking.id}>
            <p className="text-sm text-base-300">
                <span className="text-base-content">{booking.userName}</span>{' '}
                booked{' '}
                <span className="text-base-content">
                    {booking.musician.name}
                </span>
                {' at '}
                {dateLabel} for a{' '}
                <span className="text-primary">
                    {booking.requestService} Session
                </span>
            </p>
        </Alert>
    );
}
