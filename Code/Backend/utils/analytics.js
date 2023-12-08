const trackEvent = async (event, userId, pageUrl, location, additionalDetails = {}) => {
    const eventData = {
        userId,
        event,        //the type of event (e.g., 'PageView', 'PDFDownload')
        timestamp: new Date(),
        location,     //user's location, ensure privacy compliance (no ip)
        pageUrl,      //URL of the page where the event is tracked
        additionalDetails //any additional details as key-value pairs
    };

    await fetch('/api/analyticlog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    });
};

export default trackEvent;
