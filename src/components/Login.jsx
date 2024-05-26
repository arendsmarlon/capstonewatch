import React from 'react'; // Importing React library
import { useDispatch } from 'react-redux'; // Importing useDispatch hook to dispatch actions
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Importing Formik components for form handling
import * as Yup from 'yup'; // Importing Yup for form validation schema
import { login } from '../redux/actions/authActions'; // Importing login action creator

// Login component
const Login = () => {
    const dispatch = useDispatch(); // Hook for dispatching actions

    // Initial form values
    const initialValues = {
        username: '',
        password: ''
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    // Submit handler
    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(login({ name: values.username, password: values.password })); // Dispatching login action with form values
        setSubmitting(false); // Set submitting to false after dispatch
    };

    return (
        <div>
            <h2>Login</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="username" className="form-label">Username</label>
                            {/* Field for username input */}
                            <Field type="text" name="username" placeholder="Username" className="form-control" />
                            {/* Error message for username */}
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>
                        <div>
                            <label htmlFor="password" className="form-label">Password</label>
                            {/* Field for password input */}
                            <Field type="password" name="password" placeholder="Password" className="form-control" />
                            {/* Error message for password */}
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        {/* Submit button */}
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">Login</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

// Exporting the Login component
export default Login; // Exporting the Login component as the default export
