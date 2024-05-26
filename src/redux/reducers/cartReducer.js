import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions'; // Importing action types

// Initial state for the cart reducer
const initialState = {
    items: [] // Initial state has an empty cart
};

// Cart reducer function
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state, // Spread the existing state
                items: [...state.items, action.payload] // Add the new item to the cart
            };
        case REMOVE_FROM_CART:
            return {
                ...state, // Spread the existing state
                items: state.items.filter(item => item.id !== action.payload) // Remove the item from the cart based on its id
            };
        default:
            return state; // Return the current state if action type is not matched
    }
};

export default cartReducer; // Exporting the cart reducer as the default export
