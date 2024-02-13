import BookingForm, { BookingFormValues } from '@/app/musicians/BookingForm';
import { getMusicianAvailability } from '@/lib/apiClient/availability/getMusicianAvailability';
import { Musician } from '@/types/musicians';
import { useQueries, useQuery } from '@tanstack/react-query';

type BookingFormDrawerProps = {
    musician?: Musician;
    onSubmit: (data: BookingFormValues) => void;
    onClose?: () => void;
};

export default function BookingFormDrawer({
    musician,
    onClose,
    onSubmit,
}: BookingFormDrawerProps) {
    const { data: availability } = useQuery({
        queryKey: ['fetchMusicianAvailability', musician?.id],
        queryFn: () => {
            return getMusicianAvailability(musician!.id);
        },
        enabled: !!musician,
    });

    const handleBookSession = () => {
        // onSubmit({
        //     musicianId: musician?.id || 0,
        //     userName: 'test user',
        //     date: new Date().toISOString(),
        //     service: 'test service',
        // });
    };

    return (
        <div className="drawer drawer-end">
            <input
                id="booking-form-drawer"
                type="checkbox"
                checked={!!musician}
                className="drawer-toggle"
            />
            <div className="drawer-side">
                <label
                    htmlFor="booking-form-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                    onClick={onClose}
                ></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    {musician && availability && (
                        <BookingForm
                            musician={musician}
                            availableDates={availability.availableDates}
                            onSubmit={onSubmit}
                        />
                    )}
                </ul>
            </div>
        </div>
    );
}
