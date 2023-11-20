import { render, act } from '@testing-library/react';
import NotificationComponent from '../../src/components/Notification.jsx';

jest.useFakeTimers();

describe('NotificationComponent Visibility', () => {
    it('becomes visible when a message is set and invisible after timeout', () => {
        const message = "Test Message";
        const { queryByText } = render(<NotificationComponent message={message} />);

        //notification should not be visible
        expect(queryByText(message)).not.toBeVisible();

        //simulate time passing
        act(() => {
            jest.advanceTimersByTime(500); // Adjust time based on your fade-in duration
        });

        //after fading in timer is up then should be visible
        expect(queryByText(message)).toBeVisible();

        //then simulate time for the notification to fade out
        act(() => {
            jest.advanceTimersByTime(5000); // Adjust time based on your visibility duration
        });

        //then after the total duration the notification should not be visible
        expect(queryByText(message)).not.toBeVisible();
    });
});
