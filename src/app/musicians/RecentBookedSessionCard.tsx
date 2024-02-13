import Alert from '@/components/alert/Alert';
import { Booking } from '@/types';
import * as datefns from 'date-fns';

type RecentBookedSessionCardProps = {
    booking: Booking;
};

export default function RecentBookedSessionCard({
    booking,
}: RecentBookedSessionCardProps) {
    const getDateLabel = (date: string) => {
        const f = (format: string) => {
            return datefns.format(new Date(date), format);
        };

        return `${f('hh:mm a')} on ${f('do MMMM yyyy')}`;
    };

    return (
        <Alert key={booking.id}>
            <p className="text-sm text-base-300">
                <span className="text-base-content">{booking.userName}</span>{' '}
                booked{' '}
                <span className="text-base-content">
                    {booking.musician.name}
                </span>
                {' at '}
                {getDateLabel(booking.bookedDate)} for a{' '}
                <span className="text-primary">
                    {booking.requestService} Session
                </span>
            </p>
        </Alert>
    );
}
