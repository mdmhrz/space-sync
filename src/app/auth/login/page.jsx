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
import { motion } from 'framer-motion';

// Floating Label Input Component
const FloatingInput = ({ id, name, type = "text", placeholder, value, onChange, className = "", ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;
    const shouldFloat = isFocused || hasValue;

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
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
        </motion.div>
    );
};

// Floating Password Input Component
const FloatingPasswordInput = ({ id, name, placeholder, value, onChange, showPassword, onTogglePassword, className = "" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;
    const shouldFloat = isFocused || hasValue;

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
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
        </motion.div>
    );
};

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);

        try {
            const res = await axios.post('https://apitest.softvencefsd.xyz/api/login', formData);
            const data = res.data;

            console.log('Login response:', data);

            if (data.status === true) {
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    if (data.user) {
                        localStorage.setItem('userData', JSON.stringify(data.user));
                    }
                } else if (data.data && data.data.token) {
                    localStorage.setItem('authToken', data.data.token);
                    if (data.data.user) {
                        localStorage.setItem('userData', JSON.stringify(data.data.user));
                    }
                }

                toast.success(data.message || "Login successful!");
                router.push("/");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.error('Login error:', error);

            if (error.response) {
                toast.error(error.response.data?.message || "Login failed");
            } else if (error.request) {
                toast.error("Network error. Please check your connection.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="min-h-[calc(100vh-92px)] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
                <Card className="w-full max-w-md border-none shadow-none">
                    <CardContent className="p-8">
                        {/* Header */}
                        <motion.div
                            className="text-center mb-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-2xl font-bold text-foreground mb-2">
                                Welcome to ScapeSync
                            </h1>
                            <p className="text-muted-foreground">
                                Please share your login details so you can access the website.
                            </p>
                        </motion.div>

                        {/* Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                        >
                            <FloatingInput
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />

                            <FloatingPasswordInput
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                showPassword={showPassword}
                                onTogglePassword={() => setShowPassword(!showPassword)}
                            />

                            <motion.div
                                className="flex items-center justify-between space-x-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember_me"
                                        checked={formData.remember_me}
                                        onCheckedChange={handleCheckboxChange}
                                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                    <label htmlFor="remember_me" className="text-sm cursor-pointer">
                                        Remember me
                                    </label>
                                </div>

                                <Link className='underline text-sm hover:text-primary' href={"/auth/forgot-password"}>
                                    Forgot Password?
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                                    disabled={isLoading || !formData.email || !formData.password}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Signing in...</span>
                                        </div>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </motion.div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">OR</span>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.9 }}
                            >
                                <SocialLogin />
                            </motion.div>

                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1 }}
                            >
                                <span className="text-sm text-muted-foreground">
                                    Don't have an account?{' '}
                                    <Link href={"/auth/register"} className="text-primary hover:underline">
                                        Get Started
                                    </Link>
                                </span>
                            </motion.div>
                        </motion.form>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default LoginPage;
