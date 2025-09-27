import React, { useState } from 'react';
import { authAPI } from '@/api/authAPI';
import { Button } from '@/student/components/ui/button';
import { Input } from '@/student/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/student/components/ui/card';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await authAPI.forgotPassword(email);
            setMessage('If an account with that email exists, a password reset link has been sent.');
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full mt-4">Send Reset Link</Button>
                        {message && <p className="text-green-500 mt-4">{message}</p>}
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPassword;