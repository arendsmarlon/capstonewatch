// Importing necessary libraries and components
import React, { useState } from 'react'; // Importing React and useState hook
import { useSelector } from 'react-redux'; // Importing useSelector hook to access Redux state
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import { Modal, Button, Row, Col } from 'react-bootstrap'; // Importing Bootstrap components
import { FaQuestionCircle } from 'react-icons/fa'; // Importing FontAwesome icon for question mark
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling

// Checkout component
const Checkout = () => {
    // State hooks for shipping method and help modal visibility
    const [shippingMethod, setShippingMethod] = useState('DRM');
    const [showHelp, setShowHelp] = useState(false);
    
    // Accessing the cart items from the Redux store
    const cart = useSelector(state => state.cart.items);
    const navigate = useNavigate(); // Hook for navigation

    // Handler for changing shipping method
    const handleShippingChange = (event) => {
        setShippingMethod(event.target.value);
    };

    // Handler for completing the purchase
    const handleCompletePurchase = () => {
        // Add any checkout logic here
        navigate('/order-placed'); // Redirect to order confirmation page
    };

    // Handlers for showing and hiding the help modal
    const handleShowHelp = () => setShowHelp(true);
    const handleCloseHelp = () => setShowHelp(false);

    return (
        <div>
            <h2>Checkout</h2>
            <Row>
                <Col md={6}>
                    <h3>
                        Choose Your Shipping Method 
                        {/* Icon for help modal */}
                        <FaQuestionCircle 
                            onClick={handleShowHelp} 
                            style={{ cursor: 'pointer', marginLeft: '10px' }} 
                        />
                    </h3>
                    {/* Form for selecting shipping method */}
                    <form>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="DRM"
                                    checked={shippingMethod === 'DRM'}
                                    onChange={handleShippingChange}
                                />
                                DRM Protected File
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="Streaming"
                                    checked={shippingMethod === 'Streaming'}
                                    onChange={handleShippingChange}
                                />
                                Streaming on CapstoneMovies
                            </label>
                        </div>
                    </form>
                </Col>
                <Col md={6}>
                    <h3>Your Cart Summary</h3>
                    {/* Displaying the cart summary */}
                    <div>
                        {cart.map((item, index) => (
                            <div key={index}>
                                <p>{item.Title} - R {item.price}</p>
                            </div>
                        ))}
                        <h4>Total: R {cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}</h4>
                        {/* Button to complete the purchase */}
                        <button type="button" onClick={handleCompletePurchase} className="btn btn-success mt-3">Complete Purchase</button>
                    </div>
                </Col>
            </Row>
            {/* Modal for help information about shipping options */}
            <Modal show={showHelp} onHide={handleCloseHelp}>
                <Modal.Header closeButton>
                    <Modal.Title>Shipping Options Help</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>DRM Protected File:</strong> This option provides you with a downloadable file that is protected by Digital Rights Management (DRM) to prevent unauthorized distribution and will only allow the file to play for the number of weeks selected.</p>
                    <p><strong>Streaming on CapstoneMovies:</strong> This option allows you to stream the movie directly on our platform, CapstoneMovies, without downloading any files.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseHelp} className="btn btn-secondary">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

// Exporting the Checkout component
export default Checkout; // Exporting the Checkout component as the default export
