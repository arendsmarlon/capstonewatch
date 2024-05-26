// Action types
export const ADD_TO_CART = 'ADD_TO_CART'; // Action type for adding an item to the cart
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'; // Action type for removing an item from the cart

// Action creator for adding an item to the cart
export const addToCart = (item) => ({
    type: ADD_TO_CART, // Action type
    payload: item // Payload containing the item to add to the cart
});

// Action creator for removing an item from the cart
export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART, // Action type
    payload: id // Payload containing the id of the item to remove from the cart
});
