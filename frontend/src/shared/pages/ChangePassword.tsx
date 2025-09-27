import React, { useState } from 'react';
import { userAPI } from '@/api/userAPI';
import { Button } from '@/student/components/ui/button';
import { Input } from '@/student/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/student/components/ui/card';
import { Alert, AlertDescription } from "@/student/components/ui/alert";
import { Link } from 'react-router-dom'; 
import { CheckCircle } from 'lucide-react'; 

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await userAPI.changePassword(formData.oldPassword, formData.newPassword);
            setMessage(response.message); 
            setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err: any) {
            setError(err.message || 'Failed to change password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Change Your Password</CardTitle>
                </CardHeader>
                <CardContent>
                    {message ? (
                        <div className="text-center space-y-4">
                            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                            <Alert className="border-green-200 bg-green-50">
                                <AlertDescription className="text-green-700 font-medium">{message}</AlertDescription>
                            </Alert>
                            <Link to="/login" className="w-full">
                                <Button className="w-full">Go to Login</Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input type="password" name="oldPassword" placeholder="Old Password" value={formData.oldPassword} onChange={handleChange} required />
                            <Input type="password" name="newPassword" placeholder="New Password" value={formData.newPassword} onChange={handleChange} required />
                            <Input type="password" name="confirmPassword" placeholder="Confirm New Password" value={formData.confirmPassword} onChange={handleChange} required />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Updating...' : 'Update Password'}
                            </Button>
                            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePassword;