import { BookingFormValues } from '@/app/musicians/components/BookingForm';
import { postBooking } from '@/lib/apiClient/bookings/postBooking';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const usePostBookingMutation = (
    musicianId?: number,
    onSuccess?: () => void
) => {
    const queryClient = useQueryClient();
    const postBookingMutation = useMutation<
        void,
        AxiosError,
        BookingFormValues
    >({
        mutationFn: async (data: BookingFormValues) => {
            await postBooking({
                musicianId: data.musicianId,
                userName: data.userName,
                requestService: data.service,
                bookedDate: data.date,
            });
        },
        onSuccess: async () => {
            onSuccess?.();
            await queryClient.invalidateQueries({
                queryKey: ['getRecentBookings'],
            });
            await queryClient.invalidateQueries({
                queryKey: ['fetchMusicianAvailability', musicianId],
            });
        },
        onError: (error) => {
            const statusCode = error.response?.status;
            const message = error.response?.data || 'Unknown';
            toast.error(
                `Failed to book a session: ${message} (status: ${statusCode})`
            );
        },
    });

    return postBookingMutation;
};
