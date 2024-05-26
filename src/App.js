import React from 'react'; // Importing React library
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing components from react-router-dom for routing
import Header from './components/Header'; // Importing Header component
import Home from './components/Home'; // Importing Home component
import About from './components/About'; // Importing About component
import Products from './components/Products'; // Importing Products component
import Cart from './components/Cart'; // Importing Cart component
import Checkout from './components/Checkout'; // Importing Checkout component
import Login from './components/Login'; // Importing Login component
import RegistrationPage from './components/RegistrationPage'; // Importing RegistrationPage component
import RegistrationSuccess from './components/RegistrationSuccess'; // Importing RegistrationSuccess component
import OrderPlaced from './components/OrderPlaced'; // Importing OrderPlaced component
import NotFound from './components/NotFound'; // Importing NotFound component

function App() {
  return (
    <Router>
      <Header /> {/* Header component will be displayed on all pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for the Home component */}
        <Route path="/about" element={<About />} /> {/* Route for the About component */}
        <Route path="/products" element={<Products />} /> {/* Route for the Products component */}
        <Route path="/cart" element={<Cart />} /> {/* Route for the Cart component */}
        <Route path="/checkout" element={<Checkout />} /> {/* Route for the Checkout component */}
        <Route path="/login" element={<Login />} /> {/* Route for the Login component */}
        <Route path="/register" element={<RegistrationPage />} /> {/* Route for the RegistrationPage component */}
        <Route path="/registration-success" element={<RegistrationSuccess />} /> {/* Route for the RegistrationSuccess component */}
        <Route path="/order-placed" element={<OrderPlaced />} /> {/* Route for the OrderPlaced component */}
        <Route path="*" element={<NotFound />} /> {/* Route for any undefined paths, rendering the NotFound component */}
      </Routes>
    </Router>
  );
}

export default App; // Exporting the App component as the default export
