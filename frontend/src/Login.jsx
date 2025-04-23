import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../src/assets/logo.png'; // Adjust the path to your logo

function Login() {
    const [email, setEmail] = useState(''); // Changed state variable to 'email'
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { // Replace with your backend URL
                email: email, // Changed key to 'email'
                password: password,
            });

            const data = response.data;

            if (response.status === 200) {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role); // If your backend sends the role
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }

        } catch (error) {
            console.error('Error during login:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.request) {
                setError('Network error. Please check your connection.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
                    <div className="md:w-1/2 px-8">
                        <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
                        <p className="text-sm mt-4 text-[#537dc2]">
                            Welcome Back, have a nice day.
                        </p>

                        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email:
                            </label>
                            <input
                                className="p-2 rounded-xl border"
                                type="email" // Changed input type to 'email'
                                name="email"
                                id="email"
                                placeholder="Your Email" // Updated placeholder
                                value={email} // Updated value to 'email' state
                                onChange={(e) => setEmail(e.target.value)} // Updated onChange handler
                                required
                            />
                            <div className="relative">
                                <input
                                    className="p-2 rounded-xl border w-full"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="gray"
                                    className="bi bi-eye absolute top-1 right-3 translate-y-1/2 cursor-pointer"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                </svg>
                            </div>
                            <button
                                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                                type="submit"
                            >
                                Login
                            </button>
                            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                        </form>
                    </div>
                    <div className="w-1/2 md:block hidden">
                        <img src={Logo} alt="Veterinary Clinic Logo" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;