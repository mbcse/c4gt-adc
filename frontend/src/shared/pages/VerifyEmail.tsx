import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { authAPI } from '@/api/authAPI';

const VerifyEmail: React.FC = () => {
    const [message, setMessage] = useState('Verifying your email...');
    const location = useLocation();

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        if (token) {
            authAPI.verifyEmail(token)
                .then(() => setMessage('Email verified successfully! You can now log in.'))
                .catch(() => setMessage('Invalid or expired verification link.'));
        } else {
            setMessage('No verification token found.');
        }
    }, [location]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">{message}</h1>
                <Link to="/login" className="text-blue-500">Go to Login</Link>
            </div>
        </div>
    );
};

export default VerifyEmail;