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
import { useRouter } from 'next/navigation';
import { useOtp } from '@/context/OtpContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

// Floating Input
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

// Floating Password Input
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

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const { setOtpData } = useOtp();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

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
            agreeToTerms: checked
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
            terms: formData.agreeToTerms,
        };

        try {
            setLoading(true)
            const res = await axios.post(
                "https://apitest.softvencefsd.xyz/api/register",
                payload
            );

            const data = res?.data.data;
            if (data?.otp) {
                setOtpData({ email: data.email, otp: data.otp });
                toast.success(data.message || "Registered successfully!");
                setTimeout(() => {
                    router.push("/auth/email-verify");
                }, 1000);
                setLoading(false)
            } else {
                toast.error("OTP not received. Please try again.");
            }
        } catch (error) {
            console.error(error);
            const errorMsg =
                error?.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMsg);
            setLoading(false)
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-[calc(100vh-92px)] flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <Card className="w-full max-w-md border-none shadow-none">
                    <CardContent className="p-8">
                        {/* Header */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-2xl font-bold text-foreground mb-2">
                                Create your Account
                            </h1>
                            <p className="text-muted-foreground">
                                When sports Meets smart Tech.
                            </p>
                        </motion.div>

                        {/* Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Name Fields */}
                            <motion.div
                                variants={itemVariants}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <FloatingInput
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                <FloatingInput
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </motion.div>

                            {/* Email */}
                            <motion.div variants={itemVariants}>
                                <FloatingInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </motion.div>

                            {/* Password */}
                            <motion.div variants={itemVariants}>
                                <FloatingPasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    showPassword={showPassword}
                                    onTogglePassword={() => setShowPassword(!showPassword)}
                                />
                            </motion.div>

                            {/* Confirm Password */}
                            <motion.div variants={itemVariants}>
                                <FloatingPasswordInput
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    showPassword={showConfirmPassword}
                                    onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </motion.div>

                            {/* Terms */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id="terms"
                                    checked={formData.agreeToTerms}
                                    onCheckedChange={handleCheckboxChange}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <span htmlFor="terms" className="text-sm">
                                    I agree to Tech Takes <Link className='underline' href={""}>Terms of Service</Link> and <Link className='underline' href={""}>Privacy Policy</Link>.
                                </span>
                            </motion.div>

                            {/* Submit */}
                            <motion.div variants={itemVariants}>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 flex items-center justify-center gap-2"
                                        disabled={!formData.agreeToTerms || loading}
                                    >
                                        {loading ? (
                                            <>
                                                <motion.svg
                                                    className="w-5 h-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    ></path>
                                                </motion.svg>
                                                Creating Account...
                                            </>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Divider */}
                            <motion.div variants={itemVariants} className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">OR</span>
                                </div>
                            </motion.div>

                            {/* Social */}
                            <motion.div variants={itemVariants}>
                                <SocialLogin />
                            </motion.div>

                            {/* Sign In */}
                            <motion.div variants={itemVariants} className="text-center">
                                <span className="text-sm text-muted-foreground">
                                    Already have an account?{' '}
                                    <Link href={"/auth/login"}>
                                        <motion.button
                                            type="button"
                                            className="text-primary hover:underline"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Login
                                        </motion.button>
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

export default RegisterPage;
