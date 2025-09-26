'use client'
import React from 'react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import AuthHeader from '../AuthHeader';
import Link from 'next/link';

const Header = () => {
    const pathName = usePathname() || "";
    if (pathName.startsWith("/auth")) {
        return <AuthHeader></AuthHeader>
    }
    return (
        <div className='container mx-auto max-w-7xl py-4 px-6 flex items-center justify-between'>
            <img src="./header-logo.svg" alt="logo" />
            <Link href={"/auth/register"}><Button>Get Started</Button></Link>
        </div>
    );
};

export default Header;