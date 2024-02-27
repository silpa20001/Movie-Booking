import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styling/register.css';

function Register( {onRegister, closeRegister}) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        mobileNumber: '',
        address: '',
        role: 'user',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.mobileNumber || !formData.address || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('All fields are required.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/user', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Registered successfully');
                onRegister();
                setFormData({
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    mobileNumber: '',
                    address: '',
                    role: 'user',
                });
                navigate("/");
            } else {
                const errorData = await response.json();
                toast.error('Registration failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    // const closeButtonClick = () => {
    //     alert("hi................")
      
    // };

    return (
        <div className="register-background">
            <div className="register-modal">
                <div className="register-content">
                  
                    <form onSubmit={handleSubmit}>
                  
                        <h1 className="text-center mb-4">Register</h1>
                        <span className="close-btn" onClick={closeRegister}>
                        &#10006;
                    </span>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                className="form-control"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input
                                className="form-control"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                type="password"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mobile Number</label>
                            <input
                                className="form-control"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                className="form-control"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
