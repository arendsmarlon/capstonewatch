// Importing necessary libraries and components
import React from 'react'; // Importing React library
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling

// About component
function About() {
    return (
        // Container for the About page
        <div className="container text-center mt-5">
            <h2>About Our Store</h2>
            {/* Description paragraph */}
            <p className="mt-4">
                Welcome to CapstoneMovies, your premier destination for movie rentals. We are passionate about bringing you the best movies from around the world, all in one convenient place. Whether you're looking for the latest blockbusters, timeless classics, or hidden gems, we have something for everyone.
            </p>
            {/* Explanation of the store's mission and pricing model */}
            <p className="mt-3">
                Our mission is to provide a flexible and affordable way to enjoy your favorite movies. With our straightforward pricing model, you only pay for the time you need. Here's how it works:
            </p>
            {/* Pricing details */}
            <ul className="list-unstyled mt-3">
                <li><strong>Base Price:</strong> R5 for any movie</li>
                <li><strong>Weekly Price:</strong> Add R2 for each week you want to rent the movie</li>
            </ul>
            {/* Additional information about viewing options and customer satisfaction */}
            <p className="mt-3">
                This means you can enjoy high-quality movies at an economical price, tailored to your viewing needs. We offer both DRM-protected files for offline viewing and streaming directly on our platform, ensuring you have the flexibility to choose how you watch.
            </p>
            <p className="mt-3">
                At CapstoneMovies, customer satisfaction is our top priority. We strive to provide an exceptional experience with a user-friendly interface, a wide selection of movies, and top-notch customer support. Thank you for choosing CapstoneMovies as your go-to movie rental service. Happy watching!
            </p>
        </div>
    );
}

// Exporting the About component
export default About; // Exporting the About component as the default export