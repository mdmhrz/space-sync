import React from 'react';
import { Button } from '../ui/button';

const Header = () => {
    return (
        <div className='container mx-auto max-w-7xl py-4 px-6 flex items-center justify-between'>
            <img src="./header-logo.svg" alt="logo" />
            <Button>Get Started</Button>
        </div>
    );
};

export default Header;