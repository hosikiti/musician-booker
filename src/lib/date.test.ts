import { getDateHours } from './date';

describe('getDateHours', () => {
    it('should return an array of DateHours objects', () => {
        // Arrange
        const dates = [
            '2024-01-01T10:00:00',
            '2024-01-01T11:00:00',
            '2024-01-02T09:00:00',
        ];

        // Act
        const result = getDateHours(dates);

        // Assert
        expect(result).toEqual([
            {
                dateLabel: '01/01/2024',
                hourLabels: [
                    { date: '2024-01-01T10:00:00', label: '10:00' },
                    { date: '2024-01-01T11:00:00', label: '11:00' },
                ],
            },
            {
                dateLabel: '01/02/2024',
                hourLabels: [{ date: '2024-01-02T09:00:00', label: '09:00' }],
            },
        ]);
    });

    it('should handle empty input array', () => {
        // Arrange
        const dates: string[] = [];

        // Act
        const result = getDateHours(dates);

        // Assert
        expect(result).toEqual([]);
    });
});
