// redux/actions/authActions.js

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // Action type for successful login
export const LOGOUT = 'LOGOUT'; // Action type for logout

// Action creator for successful login
export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS, // Action type
    payload: user // Payload containing user data
});

// Action creator for logout
export const logout = () => ({
    type: LOGOUT // Action type
});

// Action creator for login
export const login = (user) => {
    return {
        type: LOGIN_SUCCESS, // Action type
        payload: user // Payload containing user data
    };
};