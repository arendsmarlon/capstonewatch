// Importing necessary libraries and components
import React from 'react'; // Importing React library
import { Link } from 'react-router-dom'; // Importing Link component for navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling

// Home component
function Home() {
    return (
        <div className='home-container'>
            {/* Header section with welcome message */}
            <header className='home-header'>
                <h1>Welcome to CapstoneMovies</h1>
                <p>Explore our collection of movies and enjoy your favorite films.</p>
            </header>
            
            {/* About section */}
            <section className='about-section'>
                <h2>About Us</h2>
                <p>At CapstoneMovies, we are passionate about bringing you the best in entertainment. Whether you're in the mood for a classic film or the latest blockbuster, our extensive library has something for everyone.</p>
                <p>Our platform is designed to offer you a seamless and enjoyable movie-watching experience. From browsing our collection to managing your rentals, everything is just a click away.</p>
            </section>
            
            {/* How it works section */}
            <section className='how-it-works'>
                <h2>How It Works</h2>
                <ol>
                    <li><strong>Sign Up:</strong> Create an account to start exploring our collection.</li>
                    <li><strong>Browse:</strong> Use our search feature to find movies by title, genre, or year.</li>
                    <li><strong>Rent:</strong> Select the movie you want to watch and choose the rental period that suits you best.</li>
                    <li><strong>Enjoy:</strong> Stream your rented movie online or download it for offline viewing.</li>
                </ol>
            </section>
            
            {/* Features section */}
            <section className='features'>
                <h2>Features</h2>
                <div className='features-list'>
                    <div className='feature-item'>
                        <h3>Extensive Collection</h3>
                        <p>Thousands of movies across all genres, from action to romance to documentaries.</p>
                    </div>
                    <div className='feature-item'>
                        <h3>Flexible Rentals</h3>
                        <p>Choose the rental period that works best for you, from one week to several months.</p>
                    </div>
                    <div className='feature-item'>
                        <h3>High Quality</h3>
                        <p>Enjoy movies in high definition, with options for streaming and offline viewing.</p>
                    </div>
                    <div className='feature-item'>
                        <h3>User-Friendly Interface</h3>
                        <p>Navigate our platform with ease, thanks to a clean and intuitive design.</p>
                    </div>
                </div>
            </section>

            {/* Call to action section */}
            <section className='call-to-action'>
                <h2>Get Started</h2>
                <p>Join CapstoneMovies today and dive into the world of cinema. Sign up or log in to start your movie adventure.</p>
                <div className="button-container">
                    <Link to="/login">
                        <button className='btn btn-primary'>Login</button>
                    </Link>
                    <Link to="/register">
                        <button className='btn btn-secondary'>Register</button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

// Exporting the Home component
export default Home; // Exporting the Home component as the default export
