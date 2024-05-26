import React, { useEffect } from 'react';

// Function to redirect to the homepage after 5 seconds
function moveHome() {
    setTimeout(() => {
        window.location.href = '/';
    }, 5000);
}

function OrderPlaced() {
    useEffect(() => {
        moveHome(); // Call the function to start the redirect timer
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    return (
        <div>
            {/* Display a thank you message */}
            <h1>Thank You. Please share this service with your friends; who knows, there might be a surprise for you if you do....</h1>
            <p>You will be redirected to the homepage in 5 seconds</p>
        </div>
    );
}

export default OrderPlaced; // Exporting the OrderPlaced component as the default export
