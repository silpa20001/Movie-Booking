// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// // import "./login.css";

// function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [formErrors, setFormErrors] = useState("");

//     const navigate = useNavigate("");

//     const handleSubmit = async (e) => {
//         try {
//             const errors = { username: "", password: "" }
//             if (!username) {
//                 errors.username = " *username is required ";
//             }
//             if (!password) {
//                 errors.password = " *password is required ";
//             }
//             setFormErrors(errors);

//         } catch (errors) {
//             // Handle errors if needed
//         }

//         e.preventDefault();

//         const response = await fetch("http://localhost:8000/user", {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });

//         if (response.ok) {
//             const users = await response.json();
//             const user = users.find(
//                 (u) => u.username === username && u.password === password
//             );

//             if (user) {
//                 if (user.role === "user") {
//                     // Redirect to user homepage
//                     navigate('/user');
//                 } else if (user.role === "admin") {
//                     // Redirect to admin homepage
//                     navigate('/admin');
//                 }
//             } else {
//                 toast.error("Login failed: Invalid credentials");
//             }
//         }
//     };

//     return (
//         <div className="container">
//             <form className="form" onSubmit={handleSubmit}>
//                 <h1 className="heading">Login Page</h1>
//                 <div className="mb-3">
//                     <label className="form-label">Username:</label>
//                     <input
//                         className="form-control"
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <p className="text-danger">{formErrors.username}</p>
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Password:</label>
//                     <input
//                         className="form-control"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <p className="text-danger">{formErrors.password}</p>
//                 </div>
//                 <div>
//                     <Link to="/register">Register here</Link>
//                 </div>
//                 <button type="submit" className="btn btn-primary">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState("");

    const navigate = useNavigate("");

    const handleSubmit = async (e) => {
        try {
            const errors = { username: "", password: "" }
            if (!username) {
                errors.username = "Username is required";
            }
            if (!password) {
                errors.password = "Password is required";
            }
            setFormErrors(errors);

        } catch (errors) {
            // Handle errors if needed
        }

        e.preventDefault();

        const response = await fetch("http://localhost:8000/user", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const users = await response.json();
            const user = users.find(
                (u) => u.username === username && u.password === password
            );

            if (user) {
                if (user.role === "user") {
                    // Redirect to user homepage
                    navigate('/user');
                } else if (user.role === "admin") {
                    // Redirect to admin homepage
                    navigate('/admin');
                }
            } else {
                toast.error("Login failed: Invalid credentials");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-8">
                    <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
                        <h1 className="text-center mb-4">Login</h1>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input
                                className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className="invalid-feedback">{formErrors.username}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="invalid-feedback">{formErrors.password}</div>
                        </div>
                        <div className="mb-3">
                            <Link to="/register">Don't have an account? Register here</Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

