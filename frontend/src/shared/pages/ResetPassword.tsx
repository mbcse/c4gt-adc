import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '@/api/authAPI';
import { Button } from '@/student/components/ui/button';
import { Input } from '@/student/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/student/components/ui/card';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');
        const token = new URLSearchParams(location.search).get('token');
        if (token) {
            try {
                await authAPI.resetPassword(token, password);
                setMessage('Password reset successfully! You can now log in with your new password.');
                setTimeout(() => navigate('/login'), 3000);
            } catch (err) {
                setError('Invalid or expired reset token.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mb-4"
                        />
                        <Input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full mt-4">Reset Password</Button>
                        {message && <p className="text-green-500 mt-4">{message}</p>}
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPassword;