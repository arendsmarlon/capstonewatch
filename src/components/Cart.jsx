import React from 'react'; // Import React library
import { useSelector, useDispatch } from 'react-redux'; // Import hooks for accessing Redux state and dispatching actions
import { Link } from 'react-router-dom'; // Import Link component for navigation
import Button from 'react-bootstrap/Button'; // Import Button component from react-bootstrap
import Card from 'react-bootstrap/Card'; // Import Card component from react-bootstrap
import Row from 'react-bootstrap/Row'; // Import Row component from react-bootstrap
import Col from 'react-bootstrap/Col'; // Import Col component from react-bootstrap
import { toast } from 'react-hot-toast'; // Import toast for displaying notifications
import { removeFromCart } from '../redux/actions/cartActions'; // Import action creator for removing items from the cart
import './Cart.css'; // Import custom CSS for the Cart component

const Cart = () => {
    // Access the cart items from the Redux store
    const cart = useSelector(state => state.cart.items);
    // Get the dispatch function to dispatch actions
    const dispatch = useDispatch();

    // Calculate the total price of the items in the cart
    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

    // Function to handle removing an item from the cart
    const handleRemoveFromCart = (index) => {
        // Dispatch the removeFromCart action with the item's id
        dispatch(removeFromCart(cart[index].id));
        // Show a success message using toast
        toast.success('Item removed from cart');
    };

    return (
        <div className="container">
            <h2>Your Cart</h2>
            {/* Check if the cart is empty */}
            {cart.length === 0 ? (
                <p>Your cart is empty. <Link to="/">Go back to shopping.</Link></p>
            ) : (
                <div>
                    <Row>
                        {/* Iterate over the cart items and render each item */}
                        {cart.map((item, index) => (
                            <Col md={4} key={index}>
                                <Card style={{ width: '100%', margin: '10px 0' }}>
                                    <Card.Img variant="top" src={item.Poster} /> {/* Display the item's image */}
                                    <Card.Body>
                                        <Card.Title>{item.Title}</Card.Title> {/* Display the item's title */}
                                        <Card.Text>Year: {item.Year}</Card.Text> {/* Display the item's year */}
                                        <Card.Text>Weeks: {item.weeks}</Card.Text> {/* Display the item's weeks */}
                                        <Card.Text>Price: R{item.price}</Card.Text> {/* Display the item's price */}
                                        <Button variant="danger" onClick={() => handleRemoveFromCart(index)}>Remove</Button> {/* Button to remove item from cart */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <h3>Total Price: R{totalPrice}</h3> {/* Display the total price */}
                    <Link to="/checkout">
                        <Button variant="primary">Proceed to Checkout</Button> {/* Button to proceed to checkout */}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart; // Export the Cart component as the default export
