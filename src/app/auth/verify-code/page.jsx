'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useOtp } from '@/context/OtpContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';

const VerifyCodePage = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const { otpData, setOtpData } = useOtp();
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const handleInputChange = (index, value) => {
        if (value.length > 1) return; // Only allow single digit

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newCode = [...code];

        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newCode[i] = pastedData[i];
        }
        setCode(newCode);

        // Focus the next empty input or last input
        const nextEmptyIndex = newCode.findIndex(digit => !digit);
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex].focus();
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');

        const payload = {
            email: otpData.email,
            otp: verificationCode
        }
        // console.log('Verification code submitted:', verificationCode);
        try {
            setLoading(true)
            const res = await axios.post("https://apitest.softvencefsd.xyz/api/forgot-verify-otp", payload);
            console.log(res.data);

            if (res.data.status === 201) {
                setOtpData({ token: res?.data?.data?.token })
                toast.success(res.data.message || "OTP Verified successfully");
                router.push("/auth/reset-password");
                setLoading(false)
            }

        } catch (error) {
            const errorMsg = error?.response?.data?.message || "Something went wrong!";
            toast.error(errorMsg);
            setLoading(false)
        }
    };

    const handleResendCode = () => {
        console.log('Resending code...');
        // Reset the code
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
    };

    const isCodeComplete = code.every(digit => digit !== '');

    return (
        <div className="min-h-[calc(100vh-92px)] flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-none shadow-none">
                <CardContent className="p-8">
                    {/* Back */}
                    <Link href={'/auth/forgot-password'} className='flex items-center gap-2 mb-6 cursor-pointer'>
                        <ArrowLeft className='text-primary' />
                        <p className='text-primary'>Back</p>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            Please check your email!
                        </h1>
                        <p className="text-muted-foreground">
                            We've emailed a 6-digit confirmation code to scb@domain.
                            please enter the code in below box to verify your email.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Code Input Fields */}
                        <div className="flex gap-3 justify-center">
                            {code.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-12 text-center text-lg font-semibold border-input focus:border-primary focus:ring-primary"
                                />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 flex items-center justify-center gap-2"
                            disabled={!isCodeComplete || loading}
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
                                    Verifying...
                                </>
                            ) : (
                                "Verify"
                            )}
                        </Button>





                        {/* Resend Code */}
                        <div className="text-center">
                            <span className="text-sm text-muted-foreground">
                                Don't have a code?{' '}
                                <button
                                    type="button"
                                    className="text-primary hover:underline"
                                    onClick={handleResendCode}
                                >
                                    Resend code
                                </button>
                            </span>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default VerifyCodePage;