import * as datefns from 'date-fns';

export interface DateHours {
    dateLabel: string;
    hourLabels: {
        date: string;
        label: string;
    }[];
}

export const getDateLabel = (date: string): string => {
    return datefns.format(date, 'MM/dd/yyyy');
};

export const getHourLabel = (date: string): string => {
    return datefns.format(date, 'HH:mm');
};

// returns an array of objects with dateLabel and hourLabels for the given sorted dates
export const getDateHours = (sortedDates: string[]): DateHours[] => {
    let currentDate: DateHours | null = null;
    const dateHours: DateHours[] = [];

    sortedDates.forEach((date) => {
        const dateLabel = getDateLabel(date);
        if (!currentDate || currentDate.dateLabel !== dateLabel) {
            currentDate = {
                dateLabel,
                hourLabels: [],
            };
            dateHours.push(currentDate);
        }
        currentDate.hourLabels.push({
            date,
            label: getHourLabel(date),
        });
    });

    return dateHours;
};
