import React from 'react';
import { createContext, useContext, useState } from 'react';
import NotificationComponent from "../components/Notification.jsx";

export const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);
export const NotificationProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const showNotification = (msg) => {
        setMessage('');
        setIsVisible(false);

        //need to ensure the state of it has been reset
        setTimeout(() => {
            setMessage(msg);
            setIsVisible(true);

            //hides notification after 5 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        }, 100); //tiny delay to let reset be performed
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {isVisible && <NotificationComponent message={message} />}
        </NotificationContext.Provider>
    );
};
