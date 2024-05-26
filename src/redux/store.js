import { createStore, combineReducers } from 'redux'; // Importing functions to create the Redux store and combine reducers
import authReducer from './reducers/authReducer'; // Importing the authReducer
import cartReducer from './reducers/cartReducer'; // Importing the cartReducer

// Combining all the reducers into a single root reducer
const rootReducer = combineReducers({
    auth: authReducer, // Assigning the authReducer to handle the 'auth' slice of state
    cart: cartReducer, // Assigning the cartReducer to handle the 'cart' slice of state
});

// Creating the Redux store with the combined reducers
const store = createStore(rootReducer);

export default store; // Exporting the store as the default export
