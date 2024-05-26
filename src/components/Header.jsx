// Importing necessary libraries and components
import React, { useEffect, useState } from 'react'; // Importing React, useEffect, and useState hooks
import { useSelector, useDispatch } from 'react-redux'; // Importing hooks for accessing Redux state and dispatching actions
import { Link } from 'react-router-dom'; // Importing Link component for navigation
import Navbar from 'react-bootstrap/Navbar'; // Importing Bootstrap Navbar component
import Nav from 'react-bootstrap/Nav'; // Importing Bootstrap Nav component
import Container from 'react-bootstrap/Container'; // Importing Bootstrap Container component
import Badge from 'react-bootstrap/Badge'; // Importing Bootstrap Badge component
import Button from 'react-bootstrap/Button'; // Importing Bootstrap Button component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'; // Importing lightbulb icon from FontAwesome
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import '../App.css'; // Importing custom CSS
import { logout } from '../redux/actions/authActions'; // Importing logout action creator

// Header component
const Header = () => {
    // Accessing the cart items and user information from the Redux store
    const cart = useSelector(state => state.cart.items);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch(); // Hook for dispatching actions
    const [flash, setFlash] = useState(false); // State hook for flash effect
    const [darkMode, setDarkMode] = useState(false); // State hook for dark mode

    // Effect hook to handle flash effect when cart items change
    useEffect(() => {
        if (cart.length > 0) {
            setFlash(true);
            const timer = setTimeout(() => {
                setFlash(false);
            }, 500); // flash duration
            return () => clearTimeout(timer);
        }
    }, [cart]);

    // Effect hook to handle dark mode toggling
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // Calculate the total number of items in the cart
    const totalItems = cart.reduce((total, item) => total + 1, 0);

    // Handler for logging out
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">CapstoneWatch</Navbar.Brand> {/* Brand name with link to home */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link> {/* Link to home page */}
                        <Nav.Link as={Link} to="/products">Products</Nav.Link> {/* Link to products page */}
                        <Nav.Link as={Link} to="/about">About</Nav.Link> {/* Link to about page */}
                    </Nav>
                    <Nav className="mx-auto">
                        {user ? (
                            <Nav.Item className="navbar-center">
                                {user.name}, is logged in! {/* Display user's name if logged in */}
                            </Nav.Item> //Display user's name if logged in
                        ) : (
                            <Nav.Item className="navbar-center">
                                Welcome, to the CapstoneWatch store! Please log in to continue. {/* Display generic welcome message if not logged in */}
                            </Nav.Item> // Display generic welcome message if not logged in
                        )}
                    </Nav>
                    <Nav>
                        <Button 
                            variant="outline-light"
                            onClick={() => setDarkMode(prevMode => !prevMode)}
                            className={`mode-toggle-button ${darkMode ? 'dark-mode' : 'light-mode'}`}
                        >
                            <FontAwesomeIcon icon={faLightbulb} /> {/* Button to toggle dark mode */}
                        </Button>
                        {user ? (
                            <Nav.Link as={Link} to="#" onClick={handleLogout}>
                                Logout
                            </Nav.Link> //Logout link if user is logged in
                        ) : (
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link> //Login link if user is not logged in
                        )}
                        <Nav.Link as={Link} to="/cart">
                            Cart 
                            <Badge pill bg="danger" className={`ml-2 ${flash ? 'flash' : ''}`}>
                                {totalItems}
                            </Badge> {/* Cart link with badge displaying total items */}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

// Exporting the Header component
export default Header; // Exporting the Header component as the default export
