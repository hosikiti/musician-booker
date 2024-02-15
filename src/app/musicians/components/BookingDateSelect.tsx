import { BookingFormValues } from '@/app/musicians/components/BookingForm';
import Chip from '@/components/form/Chip';
import { DateHours } from '@/lib/date';
import { Control, UseFormRegister, useWatch } from 'react-hook-form';

type BookingDateSelectProps = {
    name: keyof BookingFormValues;
    control: Control<BookingFormValues>;
    dateHours: DateHours[];
    register: UseFormRegister<BookingFormValues>;
};

export default function BookingDateSelect({
    dateHours,
    register,
    control,
    name,
}: BookingDateSelectProps) {
    const selectedDate = useWatch({ control, name });

    return dateHours.map((dateHour) => {
        return (
            <div key={dateHour.dateLabel}>
                <div className="mb-2">{dateHour.dateLabel}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                    {dateHour.hourLabels.map((hour) => {
                        const selected = hour.date === selectedDate;

                        return (
                            <Chip
                                key={hour.date}
                                selected={selected}
                                label={hour.label}
                                value={hour.date}
                                registration={register('date', {
                                    required: 'Select at least one date',
                                })}
                            ></Chip>
                        );
                    })}
                </div>
            </div>
        );
    });
}
