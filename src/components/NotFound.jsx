import React, { useEffect } from 'react';

function NotFound() {
    useEffect(() => {
        // Set a timer to redirect to the homepage after 5 seconds
        const timer = setTimeout(() => {
            window.location.href = '/';
        }, 5000);

        // Clean up the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="not-found-container">
            <h1>Page Not Found!</h1>
            <p>You will be redirected to the homepage in 5 seconds</p>
        </div>
    );
}

export default NotFound;
