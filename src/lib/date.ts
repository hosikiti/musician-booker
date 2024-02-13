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

export const getDateHours = (dates: string[]): DateHours[] => {
    let currentDate: DateHours | null = null;
    const dateHours: DateHours[] = [];

    dates.forEach((date) => {
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
