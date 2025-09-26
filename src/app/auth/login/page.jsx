'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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

// Floating Password Input Component
const FloatingPasswordInput = ({ id, name, placeholder, value, onChange, showPassword, onTogglePassword, className = "" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;
    const shouldFloat = isFocused || hasValue;

    return (
        <div className="relative">
            <Input
                id={id}
                name={name}
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`py-6 pr-12 transition-all duration-200 ${className}`}
                placeholder=""
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
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={onTogglePassword}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                )}
            </Button>
        </div>
    );
};

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember_me: false
    });
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (checked) => {
        setFormData(prev => ({
            ...prev,
            remember_me: checked
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        try {
            const res = await axios.post('https://apitest.softvencefsd.xyz/api/login', formData);
            const data = res.data; // ✅ define data

            console.log(data);

            if (data.status === true) {
                toast.success(data.message || "Email verified successfully");
                router.push("/");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-[calc(100vh-92px)] flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-none shadow-none">
                <CardContent className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            Welcome to ScapeSync
                        </h1>
                        <p className="text-muted-foreground">
                            Please share your login details so you can access the website.
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

                        {/* Password Field */}
                        <FloatingPasswordInput
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                        />


                        {/* Terms Checkbox */}
                        <div className="flex items-center justify-between space-x-2">
                            <div>
                                <Checkbox
                                    id="terms"
                                    checked={formData.remember_me}
                                    onCheckedChange={handleCheckboxChange}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <span htmlFor="terms" className="text-sm">
                                    Remember me
                                </span>
                            </div>

                            <Link className='underline text-sm' href={"/auth/forgot-password"}>Forgot Password?</Link>

                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                            disabled={!formData.remember_me}
                        >
                            Create Account
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">OR</span>
                            </div>
                        </div>

                        {/* Google Sign Up */}
                        <SocialLogin></SocialLogin>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <span className="text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link href={"/auth/register"}>
                                    <button type="button" className="text-primary hover:underline">
                                        Get Started
                                    </button>
                                </Link>
                            </span>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;