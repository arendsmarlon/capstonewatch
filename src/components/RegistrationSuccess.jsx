// Importing necessary libraries and components
import React, { useEffect } from 'react';

// Function to redirect to the login page after 5 seconds
function moveHome() {
    setTimeout(() => {
        window.location.href = '/login';
    }, 5000);
}

// RegistrationSuccess component
function RegistrationSuccess() {
    useEffect(() => {
        moveHome(); // Call the function to start the redirect timer
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    return (
        <div>
            {/* Display a success message after registration */}
            <h1>Success! This is a valid registration</h1>
            <p>You can now login to your account</p>
            <p>Thank you for registering! - We unfortunately do not have an email service at the moment - but just know you are registered. Trust.</p>
            <h2>You will be redirected to the login page in 5 seconds</h2>
        </div>
    );
}

export default RegistrationSuccess; // Exporting the RegistrationSuccess component as the default export