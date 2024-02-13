import { Musician } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import ElevatedButton from '@/components/button/ElevatedButton';
import { FieldWrapper } from '@/components/form/FieldWrapper';
import Avatar from '@/components/avatar/Avatar';
import { getDateHours } from '@/lib/date';

export interface BookingFormValues {
    musicianId: number;
    userName: string;
    date: string;
    service: string;
}

export const BOOKING_FORM_MAX_NAME_LENGTH = 32;

type BookingFormProps = {
    musician: Musician;
    availableDates: string[];
    onSubmit: (data: BookingFormValues) => void;
};

export default function BookingForm({
    onSubmit,
    availableDates,
    musician,
}: BookingFormProps) {
    const { register, handleSubmit, watch, formState } =
        useForm<BookingFormValues>();

    const selectedDate = watch('date');

    const submitHandler: SubmitHandler<BookingFormValues> = (data) => {
        onSubmit({
            ...data,
            musicianId: musician.id,
        });
    };

    const dateHours = getDateHours(availableDates);

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-row gap-2 items-start border-b mb-8">
                    <Avatar src={musician.avatar} alt={musician.name} />
                    <span className="text-lg font-bold mb-4">
                        {musician.name}
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <FieldWrapper
                        label="What's your name?"
                        errorMessage={formState.errors.userName?.message}
                    >
                        <input
                            {...register('userName', {
                                required: {
                                    value: true,
                                    message: 'Input your name',
                                },
                                maxLength: {
                                    value: BOOKING_FORM_MAX_NAME_LENGTH,
                                    message: `Input name less than ${BOOKING_FORM_MAX_NAME_LENGTH} characters`,
                                },
                            })}
                            type="text"
                            className="input"
                            placeholder='e.g. "John Doe"'
                            data-testid="userName"
                        ></input>
                    </FieldWrapper>
                    <FieldWrapper
                        label="When?"
                        errorMessage={formState.errors.date?.message}
                    >
                        {dateHours.map((dateHour) => {
                            return (
                                <div key={dateHour.dateLabel}>
                                    <div className="mb-2">
                                        {dateHour.dateLabel}
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {dateHour.hourLabels.map((hour) => {
                                            const selected =
                                                hour.date === selectedDate;
                                            const selectedStyle = 'btn-primary';
                                            const unselectedStyle = 'btn';

                                            return (
                                                <label
                                                    key={hour.date}
                                                    className={`btn ${
                                                        selected
                                                            ? selectedStyle
                                                            : unselectedStyle
                                                    }`}
                                                >
                                                    {hour.label}
                                                    <input
                                                        type="radio"
                                                        className="hidden"
                                                        value={hour.date}
                                                        {...register('date', {
                                                            required:
                                                                'Select at least one date',
                                                        })}
                                                    ></input>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </FieldWrapper>
                    <FieldWrapper
                        label="Which Instrument?"
                        errorMessage={formState.errors.service?.message}
                    >
                        <select
                            {...register('service', {
                                required: 'Select instrument for the session',
                            })}
                            className="select w-full max-w-xs"
                            data-testid="service"
                        >
                            <option value={''}>Select Instrument ...</option>
                            {musician.services.map((service) => (
                                <option key={service.name} value={service.name}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </FieldWrapper>
                </div>
                <ElevatedButton type="submit" className="btn-primary">
                    Book Session
                </ElevatedButton>
            </form>
        </>
    );
}
