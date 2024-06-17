import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/service';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false); // State để điều khiển hiển thị toast

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(baseUrl + 'api/admin/login', { email, password });
            setShowToast(true);
            setEmail('');
            setPassword('');
            
        } catch (error) {
            setError('Tài khoản hoặc mật khẩu không chính xác !!!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Đăng Nhập
                        </button>
                    </div>
                </form>
            </div>

            {showToast && (
                <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50">
                    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900">
                                        Đăng nhập thành công!
                                    </p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        onClick={() => setShowToast(false)}
                                        className="bg-white rounded-md p-1.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        <span className="sr-only">Đóng</span>
                                        <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm4.95 5.05a.75.75 0 011.061 1.061L11.061 10l4.95 4.95a.75.75 0 11-1.061 1.061L10 11.061l-4.95 4.95a.75.75 0 11-1.061-1.061L8.939 10 4.05 5.05a.75.75 0 111.061-1.061L10 8.939l4.95-4.95z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLogin;
