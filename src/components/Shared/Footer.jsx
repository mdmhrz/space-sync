"use client"
import { usePathname } from 'next/navigation';
import React from 'react';

const Footer = () => {
    const pathName = usePathname() || "";
    if (pathName.startsWith("/auth")) {
        return
    }
    return (
        <div className='bg-[#0F3B34] relative'
        >
            <div className='absolute inset-0 hidden lg:block' style={{
                backgroundImage: "url('/footer/footer-background.svg')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom right",
                backgroundSize: "cover"
            }} ></div>

            {/* Top side */}
            <div className='container mx-auto max-w-7xl px-6'>
                <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 py-20 lg:py-30'>
                    <img src="./footer/footer-logo.svg" alt="footer-logo" />
                    <p className='text-background/70 max-w-md text-xl'>Your all-in-one platform for job scheduling, employee management, and client service built to keep your business running smoothly from anywhere.</p>
                    <div className='flex flex-col xl:flex-row items-start  gap-6'>
                        <img src="./footer/app-store.svg" alt="App store" />
                        <img src="./footer/play-store.svg" alt="Play store" />
                    </div>
                </div>

                {/* Social Links */}
                <div className='flex items-center gap-10 mb-10'>
                    <img src="./footer/youtube.svg" alt="Youtube" />
                    <img src="./footer/twitter.svg" alt="Twitter" />
                    <img src="./footer/facebook.svg" alt="Facebook" />
                    <img src="./footer/instagram.svg" alt="Instagram" />
                </div>
            </div>
            <div className='border-t-2 border-primary/30'>
                <p className='max-w-7xl mx-auto px-6 text-background/30 py-px font-medium'>© 2021-2025, ScapeSync. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;