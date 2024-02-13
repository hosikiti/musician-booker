import { Musician } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as datefns from 'date-fns';
import ElevatedButton from '@/components/button/ElevatedButton';
import { FieldWrapper } from '@/components/form/FieldWrapper';

export interface BookingFormValues {
    musicianId: number;
    userName: string;
    date: string;
    service: string;
}

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

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col gap-4">
                    <FieldWrapper
                        label="What's your name?"
                        errorMessage={
                            formState.errors.userName && 'Input your name'
                        }
                    >
                        <input
                            {...register('userName', { required: true })}
                            type="text"
                            className="input"
                            placeholder='e.g. "John Doe"'
                            data-testid="userName"
                        ></input>
                    </FieldWrapper>
                    <FieldWrapper
                        label="When?"
                        errorMessage={
                            formState.errors.date && 'Select at least one date'
                        }
                    >
                        <div className="flex flex-wrap gap-2">
                            {availableDates.map((date) => {
                                const selected = date === selectedDate;
                                const selectedStyle = 'btn-primary';
                                const unselectedStyle = 'btn';

                                const label = datefns.format(date, 'HH:mm');

                                return (
                                    <label
                                        key={label}
                                        className={`btn ${
                                            selected
                                                ? selectedStyle
                                                : unselectedStyle
                                        }`}
                                    >
                                        {label}
                                        <input
                                            type="radio"
                                            className="hidden"
                                            value={date}
                                            {...register('date', {
                                                required: true,
                                            })}
                                        ></input>
                                    </label>
                                );
                            })}
                        </div>
                    </FieldWrapper>
                    <FieldWrapper
                        label="Which Instrument?"
                        errorMessage={
                            formState.errors.service &&
                            'Select instrument for the session'
                        }
                    >
                        <select
                            {...register('service', { required: true })}
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
