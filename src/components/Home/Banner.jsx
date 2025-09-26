import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className='bg-gradient-to-br from-primary/10 via-background via-background via-primary-10 to-primary/10'>
            <div className='container mx-auto max-w-7xl px-6 flex flex-col md:flex-row gap-10 items-center justify-between pt-20'>
                {/* Left Side */}
                <div className='max-w-[50%] relative xl:-mt-30 2xl:-mt-20'>
                    <img className='absolute xl:-top-28 2xl:-top-22 left-20' src="/banner/text-background.svg" alt="text-background" />
                    <h1 className='text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold mb-6'>All Your Jobs <br />One Smart App</h1>
                    <p className='text-foreground/50 text-xl mb-16'>Built for business owners, employees, and clients streamline job scheduling, service tracking, and team management in one powerful app.</p>
                    <div className='flex items-center gap-6'>
                        <img src="/banner/app-store.svg" alt="App Store" />
                        <img src="/banner/play-store.svg" alt="Play Store" />
                    </div>
                </div>
                <div>
                    <Image src={'/banner/banner-image.png'} width={400} height={100} alt='banner image'></Image>
                </div>
            </div>
        </div>
    );
};

export default Banner;