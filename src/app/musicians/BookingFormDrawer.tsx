import { MusicianAvailabilityResponse } from '@/app/api/musicians/[id]/availability/route';
import BookingForm, { BookingFormValues } from '@/app/musicians/BookingForm';
import NotAvailableForm from '@/app/musicians/NotAvailableForm';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
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
    const { data: availability, isLoading } = useQuery({
        queryKey: ['fetchMusicianAvailability', musician?.id],
        queryFn: () => {
            return getMusicianAvailability(musician!.id);
        },
        enabled: !!musician,
    });

    const buildContents = (
        musician?: Musician,
        availability?: MusicianAvailabilityResponse
    ) => {
        if (!musician) return null;
        if (isLoading) {
            return <LoadingSpinner />;
        }
        if (availability) {
            if (availability.availableDates.length > 0) {
                return (
                    <BookingForm
                        musician={musician}
                        availableDates={availability.availableDates}
                        onSubmit={onSubmit}
                    />
                );
            } else {
                return (
                    <NotAvailableForm
                        musicianName={musician.name}
                        onClose={onClose}
                    />
                );
            }
        }
        return null;
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
                <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
                    {/* Sidebar content here */}
                    {buildContents(musician, availability)}
                </div>
            </div>
        </div>
    );
}
