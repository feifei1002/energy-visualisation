import { render, fireEvent } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../contexts/NotificationContext.jsx';

const TestComponent = () => {
    const { triggerNotification } = useNotification();
    return <button onClick={() => triggerNotification("Test Message")}>Trigger</button>;
};

describe('NotificationProvider', () => {
    it('provides triggerNotification function', () => {
        const { getByText } = render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );
        fireEvent.click(getByText('Trigger'));
        expect(getByText('Test Message')).toBeInTheDocument();
    });
});
