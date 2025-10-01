"use client"
import React, { useState } from 'react'

const SignInPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign in form submitted:', formData);
    };

    const handleGoogleSignIn = () => {
        console.log('Google sign in clicked');
    };

    const handleFacebookSignIn = () => {
        console.log('Facebook sign in clicked');
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="bg-[#F8F8F8] rounded-xl shadow-lg overflow-hidden max-w-none w-full flex">
                <div className="w-full md:mr-10 md:ml-10 lg:w-1/2 p-8 lg:p-12">
                    <div className="mb-8">
                        <h1 className="text-3xl 2xl:text-5xl font-bold text-gray-900 mb-2">Log In</h1>
                        <p className="text-gray-600 2xl:text-3xl">Please enter your details</p>
                        <div className="hidden lg:block w-full h-px bg-gray-300 mt-6"></div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm 2xl:text-xl font-medium text-gray-700 mb-2">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="example@gmail.com"
                                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 2xl:placeholder:text-lg focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm 2xl:text-xl font-medium text-gray-700 mb-2">
                                Your Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••••"
                                    className="w-full px-4 py-3 border bg-white 2xl:placeholder:text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        {showPassword ? (
                                            <>
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </>
                                        ) : (
                                            <>
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                                <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" />
                                            </>
                                        )}
                                    </svg>
                                </button>


                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="ml-2 text-sm  2xl:text-xl text-gray-700">Remember for 30 days</span>
                            </label>
                            <a href="#" className="text-sm 2xl:text-xl text-gray-900 underline hover:no-underline">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full bg-[#E7F0D3] cursor-pointer hover:bg-[#d9eab5] text-gray-800 font-medium py-3 px-6  2xl:text-xl rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-green-400 focus:outline-none"
                        >
                            Sign in
                        </button>

                        <div className="flex justify-center">
                            <span className="text-gray-500 text-center">or</span>
                        </div>

                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-gray-700  2xl:text-xl font-medium">Log in with Google</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleFacebookSignIn}
                                className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="text-gray-700 2xl:text-xl font-medium">Log in with Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center">
                    <img src="/signin/image.png" alt="Nolcha" className='w-full h-full object-cover' />
                </div>
            </div>
        </div>
    );
};

export default SignInPage;