import { Musician } from '@/types/musicians';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as datefns from 'date-fns';
import Button from '@/components/button/Button';

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

type FieldWrapperProps = {
    label: string;
    children: React.ReactNode;
    errorMessage?: string;
};

const FieldWrapper = ({ label, children, errorMessage }: FieldWrapperProps) => (
    <div className="mb-4 flex flex-col gap-2">
        <label className="text-lg font-bold">{label}</label>
        {children}
        <div className="text-sm text-error">{errorMessage}</div>
    </div>
);

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
                            className="input input-bordered"
                            placeholder='e.g. "John Doe"'
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
                                const unselectedStyle = 'btn-outline';

                                const label = datefns.format(date, 'HH:mm');

                                return (
                                    <>
                                        <label
                                            className={`btn ${
                                                selected
                                                    ? selectedStyle
                                                    : unselectedStyle
                                            }`}
                                        >
                                            {label}
                                            <input
                                                key={date}
                                                type="radio"
                                                className="hidden"
                                                value={date}
                                                {...register('date', {
                                                    required: true,
                                                })}
                                            ></input>
                                        </label>
                                    </>
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
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option disabled selected value={''}>
                                Select Instrument ...
                            </option>
                            {musician.services.map((service) => (
                                <option key={service.name} value={service.name}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </FieldWrapper>
                </div>
                <Button type="submit">Book Section</Button>
            </form>
        </>
    );
}
