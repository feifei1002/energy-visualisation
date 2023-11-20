import { createContext, useContext, useState } from 'react';
import NotificationComponent from "../components/Notification.jsx";

export const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [message, setMessage] = useState('');

    const showNotification = (msg) => {
        setMessage(msg);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <NotificationComponent message={message} />
        </NotificationContext.Provider>
    );
};
