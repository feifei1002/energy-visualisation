import { render } from '@testing-library/react';
import NotificationComponent from '../../src/components/Notification.jsx';

describe('NotificationComponent', () => {
    it('renders correctly with a message', () => {
        const { getByText } = render(<NotificationComponent message="Test Message" />);
        expect(getByText('Test Message')).toBeInTheDocument();
    });
});
