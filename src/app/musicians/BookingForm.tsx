import { Musician } from '@/types/musicians';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as datefns from 'date-fns';

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
};

const FieldWrapper = ({ label, children }: FieldWrapperProps) => (
    <div className="mb-4 flex flex-col gap-2">
        <label className="text-lg font-bold">{label}</label>
        {children}
    </div>
);

export default function BookingForm({
    onSubmit,
    availableDates,
    musician,
}: BookingFormProps) {
    const { register, handleSubmit, watch } = useForm<BookingFormValues>();

    const selectedDate = watch('date');

    const submitHandler: SubmitHandler<BookingFormValues> = (data) => {
        alert('submit:' + JSON.stringify(data));
        onSubmit(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col gap-4">
                    <FieldWrapper label="What's your name?">
                        <input
                            {...register('userName', { required: true })}
                            type="text"
                            className="input input-bordered"
                            placeholder='e.g. "John Doe"'
                        ></input>
                    </FieldWrapper>
                    <FieldWrapper label="When?">
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
                    <FieldWrapper label="Which Instrument?">
                        <select
                            {...register('service')}
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option disabled selected>
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
                <button
                    type="submit"
                    className="btn btn-primary w-full max-w-xs"
                >
                    Book Session
                </button>
            </form>
        </>
    );
}
