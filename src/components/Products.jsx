import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect hooks
import { useDispatch, useSelector } from 'react-redux'; // Importing hooks for accessing Redux state and dispatching actions
import { Link } from 'react-router-dom'; // Importing Link component for navigation
import Card from 'react-bootstrap/Card'; // Importing Bootstrap Card component
import Button from 'react-bootstrap/Button'; // Importing Bootstrap Button component
import Dropdown from 'react-bootstrap/Dropdown'; // Importing Bootstrap Dropdown component
import Form from 'react-bootstrap/Form'; // Importing Bootstrap Form component
import Modal from 'react-modal'; // Importing Modal component from react-modal
import { toast, Toaster } from 'react-hot-toast'; // Importing toast and Toaster components from react-hot-toast
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import { addToCart, removeFromCart } from '../redux/actions/cartActions'; // Importing action creators for cart actions

const API_KEY = process.env.REACT_APP_OMDB_API_KEY; // Accessing OMDB API key from environment variables
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`; // OMDB API URL

// Function to fetch movie data based on a search term
const fetchMovieData = async (searchTerm) => {
    const response = await fetch(`${API_URL}&s=${searchTerm}`);
    const data = await response.json();
    return data.Search || [];
};

// Function to get a random movie
const getRandomMovie = async () => {
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`${API_URL}&s=movie&page=${randomPage}`);
    const data = await response.json();
    if (data.Search && data.Search.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.Search.length);
        return data.Search[randomIndex];
    }
    return null;
};

// Products component
const Products = () => {
    const dispatch = useDispatch(); // Hook for dispatching actions
    const cart = useSelector(state => state.cart.items); // Accessing cart items from Redux state
    const [movies, setMovies] = useState([]); // State for storing movie data
    const [featuredMovie, setFeaturedMovie] = useState(null); // State for storing featured movie data
    const [searchTerm, setSearchTerm] = useState(''); // State for storing search term
    const [weeks, setWeeks] = useState({}); // State for storing selected rental weeks for each movie
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [loadingFeatured, setLoadingFeatured] = useState(true); // State for loading featured movie
    const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility

    useEffect(() => {
        // Fetch all movies and a random featured movie on component mount
        const fetchMovies = async () => {
            setLoading(true);
            const moviesData = await fetchMovieData('');
            setMovies(moviesData);
            setLoading(false);
        };
        fetchMovies();

        const fetchFeaturedMovie = async () => {
            setTimeout(async () => {
                const randomMovie = await getRandomMovie();
                if (randomMovie) {
                    const response = await fetch(`${API_URL}&i=${randomMovie.imdbID}`);
                    const data = await response.json();
                    setFeaturedMovie(data);
                }
                setLoadingFeatured(false);
            }, 2000);
        };
        fetchFeaturedMovie();
    }, []);

    // Handle movie search
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const moviesData = await fetchMovieData(searchTerm);
        setMovies(moviesData);
        setLoading(false);
    };

    // Handle adding a movie to the cart
    const handleAddToCart = (movie) => {
        const itemInCart = cart.find((item) => item.imdbID === movie.imdbID);
        if (itemInCart) {
            toast.error('Movie already in cart');
            return;
        }

        const item = {
            ...movie,
            price: calculatePrice(movie, weeks[movie.imdbID]),
            weeks: weeks[movie.imdbID],
        };

        dispatch(addToCart(item));
        toast.success('Movie added to cart');
    };

    // Calculate the rental price based on the number of weeks
    const calculatePrice = (movie, weeks) => {
        const basePrice = 5;
        const weekPrice = weeks * 2;
        const totalPrice = basePrice + weekPrice;
        return totalPrice.toFixed(2);
    };

    // Handle change in the number of rental weeks
    const handleWeekChange = (imdbID, event) => {
        const selectedWeeks = event.target.value;
        setWeeks((prevWeeks) => ({ ...prevWeeks, [imdbID]: selectedWeeks }));
    };

    // Handle removing a movie from the cart
    const handleRemoveFromCart = (imdbID) => {
        dispatch(removeFromCart(imdbID));
        toast.success('Item removed from cart');
    };

    // Close the modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Check if a movie is already in the cart
    const isInCart = (imdbID) => {
        return cart.some(item => item.imdbID === imdbID);
    };

    return (
        <div className="container">
            <Toaster />
            <Form onSubmit={handleSearch} className="my-4">
                <Form.Group controlId="searchForm">
                    <Form.Control
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
            <Link to="/cart">
                <Button variant="secondary" className="my-2">
                    Go to Cart ({cart.length})
                </Button>
            </Link>
            <div className="my-4">
                <h3>Why Choose Us for Your Movie Rentals?</h3>
                <p>We offer a flexible and affordable way to enjoy your favorite movies. Our pricing is straightforward:</p>
                <ul>
                    <li><strong>Base Price:</strong> R5 for any movie</li>
                    <li><strong>Weekly Price:</strong> Add R2 for each week you want to rent the movie</li>
                </ul>
                <p>This means you only pay for the time you need, making it an economical choice for all your movie-watching needs.</p>
                <p>We also provide a variety of options including DRM-protected files for offline viewing and streaming directly on our platform. Enjoy high-quality movies with the flexibility to choose the rental period that suits you best.</p>
            </div>
            {loading && <div className="loading">Loading...</div>}
            {!loading && movies.length === 0 && !searchTerm && (
                <div className="row">
                    {loadingFeatured && <div className="loading">Loading featured movie...</div>}
                    {featuredMovie && !loadingFeatured && (
                        <div className="col-md-12 featured-movie">
                            <h3>Featured Movie</h3>
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src={featuredMovie.Poster} style={{ width: '50%', margin: '0 auto' }} />
                                <Card.Body>
                                    <Card.Title>{featuredMovie.Title}</Card.Title>
                                    <Card.Text>Year: {featuredMovie.Year}</Card.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {weeks[featuredMovie.imdbID] ? `${weeks[featuredMovie.imdbID]} week(s)` : 'Select weeks'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {[...Array(26).keys()].map(i => (
                                                <Dropdown.Item
                                                    key={i + 1}
                                                    onClick={() => handleWeekChange(featuredMovie.imdbID, { target: { value: i + 1 } })}
                                                >
                                                    {i + 1} week(s)
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {isInCart(featuredMovie.imdbID) ? (
                                        <Button variant="danger" onClick={() => handleRemoveFromCart(featuredMovie.imdbID)}>Remove from Cart</Button>
                                    ) : (
                                        <Button 
                                            variant="primary" 
                                            onClick={() => handleAddToCart(featuredMovie)} 
                                            disabled={!weeks[featuredMovie.imdbID]}
                                        >
                                            Add to Cart
                                        </Button>
                                    )}
                                    <Button onClick={() => setModalIsOpen(true)}>View Details</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </div>
            )}
            {movies.length > 0 && (
                <div className="row">
                    {movies.map(movie => (
                        <div className="col-md-4" key={movie.imdbID}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={movie.Poster} />
                                <Card.Body>
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Card.Text>Year: {movie.Year}</Card.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {weeks[movie.imdbID] ? `${weeks[movie.imdbID]} week(s)` : 'Select weeks'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {[...Array(26).keys()].map(i => (
                                                <Dropdown.Item
                                                    key={i + 1}
                                                    onClick={() => handleWeekChange(movie.imdbID, { target: { value: i + 1 } })}
                                                >
                                                    {i + 1} week(s)
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {isInCart(movie.imdbID) ? (
                                        <Button variant="danger" onClick={() => handleRemoveFromCart(movie.imdbID)}>Remove from Cart</Button>
                                    ) : (
                                        <Button 
                                            variant="primary" 
                                            onClick={() => handleAddToCart(movie)} 
                                            disabled={!weeks[movie.imdbID]}
                                        >
                                            Add to Cart
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
            {featuredMovie && (
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Featured Movie Details">
                    <h2>{featuredMovie.Title}</h2>
                    <p>{featuredMovie.Plot}</p>
                    <Button onClick={closeModal}>Close</Button>
                </Modal>
            )}
        </div>
    );
};

export default Products; // Exporting the Products component as the default export
