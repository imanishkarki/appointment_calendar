import React, { useEffect, useState } from 'react';

const NotificationSystem = () => {
    const [notifications, setNotifications] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Create WebSocket connection
        const websocket = new WebSocket('ws://localhost:8000/ws/notifications/');

        websocket.onopen = () => {
            console.log('Connected to WebSocket');
        };

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setNotifications(prev => [...prev, data.message]);
            
            // Show browser notification
            if (Notification.permission === "granted") {
                new Notification("Calendar Update", { body: data.message });
            }
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setWs(websocket);

        // Request notification permission
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        // Cleanup on component unmount
        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, []);

    return (
        <div className="notification-container">
            {notifications.map((notification, index) => (
                <div key={index} className="notification-item">
                    {notification}
                </div>
            ))}
        </div>
    );
};

export default NotificationSystem; 