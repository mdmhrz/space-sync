'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';



// Floating Label Input Component
const FloatingInput = ({ id, name, type = "text", placeholder, value, onChange, className = "", ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;
    const shouldFloat = isFocused || hasValue;

    return (
        <div className="relative">
            <Input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`py-6 transition-all duration-200 ${className}`}
                placeholder=""
                {...props}
            />
            <label
                htmlFor={id}
                className={`absolute left-3 transition-all duration-200 pointer-events-none ${shouldFloat
                    ? 'top-0 -translate-y-1/2 text-xs bg-background px-1 text-primary'
                    : 'top-1/2 -translate-y-1/2 text-base text-muted-foreground'
                    }`}
            >
                {placeholder}
            </label>
        </div>
    );
};

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-[calc(100vh-92px)] flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-none shadow-none">
                <CardContent className="p-8">
                    {/* Back */}
                    <Link href={'/auth/login'} className='flex items-center gap-2 mb-6'>
                        <ArrowLeft className='text-primary' />
                        <p className='text-primary'>Back</p>
                    </Link>
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            Forgot Password?
                        </h1>
                        <p className="text-muted-foreground">
                            Please enter the email address associated with your account, and we'll email you a link to reset your password.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email Field */}
                        <FloatingInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />


                        {/* Submit Button */}
                        <Link href={'/auth/verify-code'}>
                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"

                            >
                                Reset Password
                            </Button>
                        </Link>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;