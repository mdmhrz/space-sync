import Link from 'next/link';
import React from 'react';

const AuthHeader = () => {
    return (
        <div className='container mx-auto max-w-7xl py-4'>
            <Link href={"/"}><img src="/header-logo.svg" alt="Header Logo" /></Link>
        </div>
    );
};

export default AuthHeader;