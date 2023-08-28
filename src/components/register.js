


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// // import "./register.css";

// function Register() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const [mobileNumber, setMobileNumber] = useState("");
//     const [address, setAddress] = useState("");
//     const [role, setRole] = useState("user"); // Default role is "user"

//     const [formErrors, setFormErrors] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         const errors = {
//             username: "",
//             mobileNumber: "",
//             address: "",
//             email: "",
//             password: "",
//             confirmPassword: ""
//         };

//         try {
//             if (!username) {
//                 errors.username = "* Username is required";
//             }
//             if (!mobileNumber) {
//                 errors.mobileNumber = "* Mobilenumber is required";
//             }
//             if (!address) {
//                 errors.address = "* Address is required";
//             }
//             if (!email) {
//                 errors.email = "* Email is required";
//             }
//             if (!password) {
//                 errors.password = "* Password is required";
//             }
//             if (!confirmPassword) {
//                 errors.confirmPassword = "* Confirm password is required";
//             }
//             setFormErrors(errors);

//             if (Object.values(errors).every(error => !error)) {
//                 const regobj = {
//                     username,
//                     password,
//                     confirmPassword,
//                     email,
//                     mobileNumber,
//                     address,
//                     role
//                 };

//                 console.log(regobj);
//                 fetch("http://localhost:8000/user", {
//                     method: "POST",
//                     headers: { 'content-type': 'application/json' },
//                     body: JSON.stringify(regobj)
//                 }).then(() => {
//                     toast.success("Registered successfully");
//                     navigate('/login');
//                 }).catch((err) => {
//                     toast.error("Registration failed: " + err.message);
//                 });
//             }
//         } catch (error) {
//             console.error("Error during registration:", error);
//         }

//         e.preventDefault();
//     };

//     return (
//         <div>
//             <form className="form" onSubmit={handleSubmit}>
//                 <h1 className="heading">Register Form</h1>
//                 <br />

//                 <label className="head">Username</label>
//                 <input
//                     className="field"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     type="text"
//                 />
//                 <p>{formErrors.username}</p>
//                 <br />

//                 <label className="head">Password</label>
//                 <input
//                     className="field"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     type="password"
//                 />
//                 <p>{formErrors.password}</p>
//                 <br />

//                 <label className="head">Confirm Password</label>
//                 <input
//                     className="field"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     type="password"
//                 />
//                 <p>{formErrors.confirmPassword}</p>
//                 <br />

//                 <label className="head">Mobile Number</label>
//                 <input
//                     className="field"
//                     value={mobileNumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                     type="text"
//                 />
//                 <p>{formErrors.mobileNumber}</p>
//                 <br />

//                 <label className="head">Address</label>
//                 <input
//                     className="field"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     type="text"
//                 />
//                 <p>{formErrors.address}</p>
//                 <br />

//                 <label className="head">Email</label>
//                 <input
//                     className="field"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     type="text"
//                 />
//                 <p>{formErrors.email}</p>
//                 <br />

//                 <label className="head">Role</label>
//                 <select
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                 >
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
//                 </select>
//                 <br />

//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// }

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("user"); // Default role is "user"

    const [formErrors, setFormErrors] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const errors = {
            username: "",
            mobileNumber: "",
            address: "",
            email: "",
            password: "",
            confirmPassword: ""
        };

        try {
            if (!username) {
                errors.username = "* Username is required";
            }
            if (!mobileNumber) {
                errors.mobileNumber = "* Mobilenumber is required";
            }
            if (!address) {
                errors.address = "* Address is required";
            }
            if (!email) {
                errors.email = "* Email is required";
            }
            if (!password) {
                errors.password = "* Password is required";
            }
            if (!confirmPassword) {
                errors.confirmPassword = "* Confirm password is required";
            }
            setFormErrors(errors);

            if (Object.values(errors).every(error => !error)) {
                const regobj = {
                    username,
                    password,
                    confirmPassword,
                    email,
                    mobileNumber,
                    address,
                    role
                };

                console.log(regobj);
                fetch("http://localhost:8000/user", {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(regobj)
                }).then(() => {
                    toast.success("Registered successfully");
                    navigate('/login');
                }).catch((err) => {
                    toast.error("Registration failed: " + err.message);
                });
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }

        e.preventDefault();
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
                        <h1 className="text-center mb-4">Register Form</h1>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                            />
                            <div className="invalid-feedback">{formErrors.username}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                            <div className="invalid-feedback">{formErrors.password}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input
                                className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                            />
                            <div className="invalid-feedback">{formErrors.confirmPassword}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mobile Number</label>
                            <input
                                className={`form-control ${formErrors.mobileNumber ? 'is-invalid' : ''}`}
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                type="text"
                            />
                            <div className="invalid-feedback">{formErrors.mobileNumber}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                            />
                            <div className="invalid-feedback">{formErrors.address}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                            />
                            <div className="invalid-feedback">{formErrors.email}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

