import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BookingForm from '../app/musicians/BookingForm';
import { Musician } from '../types';
import userEvent from '@testing-library/user-event';
import * as datefns from 'date-fns';

describe('BookingForm', () => {
    // prepare test data and render the form
    const setupForm = () => {
        const handleSubmit = jest.fn();
        const musician: Musician = {
            id: 1,
            name: 'John Doe',
            services: [
                {
                    name: 'Baroque Violin',
                },
                {
                    name: 'Recorder',
                },
            ],
            avatar: 'https://example.com/avatar.jpg',
        };

        const availableDates = [
            '2024-01-01T12:15:00.000Z',
            '2024-01-01T19:15:00.000Z',
            '2024-01-01T20:15:00.000Z',
        ];

        const dateLabels = availableDates.map((date) =>
            datefns.format(new Date(date), 'HH:mm')
        );

        const instrumentsLabels = musician.services.map(
            (service) => service.name
        );

        render(
            <BookingForm
                musician={musician}
                availableDates={availableDates}
                onSubmit={handleSubmit}
            ></BookingForm>
        );

        return {
            handleSubmit,
            availableDates,
            musician,
            dateLabels,
            instrumentsLabels,
        };
    };

    const inputUserName = async () => {
        const nameInput = screen.getByTestId('userName');
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, 'John Doe');
    };

    const selectDate = async (date: string) => {
        const dateInput = screen.getByLabelText(date);
        await userEvent.click(dateInput);
    };

    const selectInstrument = async (instrument: string) => {
        const serviceInput = screen.getByTestId('service');
        await userEvent.selectOptions(serviceInput, instrument);
    };

    const getValidationErrors = async () => {
        const alerts = await screen.findAllByRole('alert');
        const errors = alerts.reduce((acc, alert) => {
            if (alert.textContent) {
                acc.push(alert.textContent);
            }
            return acc;
        }, [] as string[]);
        return errors;
    };

    const clickSubmit = async () => {
        const submitButton = screen.getByText('Book Session');
        await userEvent.click(submitButton);
    };

    it('submits the form with valid data', async () => {
        // Arrange
        const {
            handleSubmit,
            dateLabels,
            instrumentsLabels,
            musician,
            availableDates,
        } = setupForm();

        // Act
        await inputUserName();
        await selectDate(dateLabels[0]);
        await selectInstrument(instrumentsLabels[0]);
        await clickSubmit();

        // Assert
        expect(handleSubmit).toHaveBeenCalledWith({
            date: availableDates[0],
            musicianId: musician.id,
            service: musician.services[0].name,
            userName: 'John Doe',
        });
    });

    it('shows an error when submitting without user name', async () => {
        // Arrange
        const { handleSubmit, dateLabels, instrumentsLabels } = setupForm();

        // Act
        await selectDate(dateLabels[0]);
        await selectInstrument(instrumentsLabels[0]);
        await clickSubmit();
        const errors = await getValidationErrors();

        // Assert
        expect(errors).toEqual(['Input your name']);
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('shows an error when submitting without date', async () => {
        // Arrange
        const { handleSubmit, dateLabels, instrumentsLabels } = setupForm();

        // Act
        await inputUserName();
        await selectInstrument(instrumentsLabels[0]);
        await clickSubmit();
        const errors = await getValidationErrors();

        // Assert
        expect(errors).toEqual(['Select at least one date']);
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('shows an error when submitting without instrument', async () => {
        // Arrange
        const { handleSubmit, dateLabels, instrumentsLabels } = setupForm();

        // Act
        await inputUserName();
        await selectDate(dateLabels[0]);
        await clickSubmit();
        const errors = await getValidationErrors();

        // Assert
        expect(errors).toEqual(['Select instrument for the session']);
        expect(handleSubmit).not.toHaveBeenCalled();
    });
});
