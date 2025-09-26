'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useOtp } from '@/context/OtpContext';

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

const ForgotPasswordPage = () => {
    const [formData, setFormData] = useState({ email: '' });
    const router = useRouter();
    const { otpData, setOtpData } = useOtp();
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = formData.email;
        setOtpData({ email: email })
        try {
            setLoading(true)
            const res = await axios.post("https://apitest.softvencefsd.xyz/api/forgot-password", { email });
            console.log(res.data);

            if (res.data.status === 201) {

                toast.success("Reset code sent to your email!");
                router.push("/auth/verify-code");
                setLoading(false)
            }

        } catch (error) {
            const errorMsg = error?.response?.data?.message || "Something went wrong!";
            toast.error(errorMsg);
            setLoading(false)
        }
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
                        <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h1>
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

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="w-5 h-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
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
                                    </svg>
                                    Reseting...
                                </>
                            ) : (
                                "Reset"
                            )}
                        </Button>


                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;
