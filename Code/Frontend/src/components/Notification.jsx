import React from 'react';
import { useState, useEffect } from 'react';
import '../css/Notification.css';

function NotificationComponent({ message, duration = 5000 }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    if (!visible) return null;

    return (
        <div className="notification">
            {message}
        </div>
    );
}

export default NotificationComponent;
