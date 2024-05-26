import { LOGIN_SUCCESS, LOGOUT } from '../actions/authActions'; // Importing action types

// Initial state for the authentication reducer
const initialState = {
    user: null // Initial state has no user logged in
};

// Authentication reducer function
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state, // Spread the existing state
                user: action.payload // Update the user state with the payload from the action
            };
        case LOGOUT:
            return {
                ...state, // Spread the existing state
                user: null // Set the user state to null on logout
            };
        default:
            return state; // Return the current state if action type is not matched
    }
};

export default authReducer; // Exporting the authentication reducer as the default export
