import React from 'react';
import { render } from '@testing-library/react';
import NotificationComponent from '../../src/components/Notification.jsx';
import '@testing-library/jest-dom';

describe('NotificationComponent Message Content', () => {
    it('displays the correct message content', () => {
        const message = "Test Message";
        const { getByText } = render(<NotificationComponent message={message} />);

        //notification should display the given message
        expect(getByText(message)).toBeInTheDocument();
    });
});
