import React, { useState } from 'react'; // Importing React and useState hook
import { useFormik } from 'formik'; // Importing useFormik hook from Formik for form management
import * as Yup from 'yup'; // Importing Yup for form validation schema
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import { toast, Toaster } from 'react-hot-toast'; // Importing toast and Toaster components from react-hot-toast

// Defines the RegistrationPage functional component using React
function RegistrationPage() {
    // Provides navigation functionality, e.g., to redirect the user after successful registration
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);

    // Sets up form management and validation using Formik and Yup
    const formik = useFormik({
        // Defines initial default values for form inputs
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        // Defines validation rules for the form fields using Yup
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less') // Limits first name to 15 characters
                .matches(/^[A-Za-z]*$/, 'Only alphabet letters are allowed') // Ensures only alphabets are allowed
                .required('Required'), // Makes this field required
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less') // Limits last name to 20 characters
                .matches(/^[A-Za-z]*$/, 'Only alphabet letters are allowed') // Ensures only alphabets are allowed
                .required('Required'), // Makes this field required
            email: Yup.string()
                .email('Invalid email address') // Ensures the email follows a proper email format
                .required('Required'), // Makes this field required
            password: Yup.string()
                .min(8, 'Must contain 8 characters or more') // Sets a minimum length for password
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character') // Enforces a strong password policy
                .required('Required'), // Makes this field required
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match') // Checks that the confirmPassword matches the password
                .required('Required') // Makes this field required
        }),
        // Handle form submission
        onSubmit: values => {
            setIsRegistering(true);
            setTimeout(() => {
                const username = `${values.firstName.toLowerCase()}.${values.lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;
                toast.success(`Registration successful! Your username is: ${username}`);
                setIsRegistering(false);
                navigate('/registration-success'); // Redirects to success page
            }, 5000); // Simulates a 5-second delay
        }
    });

    // JSX for rendering the registration form
    return (
        <div className="RegisterLogin">
            <Toaster />
            <h1>Register</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}
                <label htmlFor="lastName">Surname</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                ) : null}
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div>{formik.errors.confirmPassword}</div>
                ) : null}
                <button type="submit" className="btn btn-primary" disabled={isRegistering}>
                    {isRegistering ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default RegistrationPage; // Exporting the RegistrationPage component as the default export
