"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
    return (
        <div className="bg-gradient-to-br from-primary/10 via-background via-background via-primary-10 to-primary/10 relative">
            <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row gap-10 items-center justify-between pt-20">
                {/* Left Side */}
                <motion.div
                    className="lg:max-w-[50%] relative"
                    initial={{ x: -150, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "spring", stiffness: 80 }}
                >
                    <div className="relative">
                        <motion.img
                            className="hidden lg:block absolute w-fit -top-22 left-20"
                            src="/banner/text-background.svg"
                            alt="text-background"
                            initial={{ rotate: -20, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                        <motion.h1
                            className="text-5xl lg:text-6xl 2xl:text-7xl font-bold mb-6"
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            All Your Jobs <br />
                            One Smart App
                        </motion.h1>
                    </div>
                    <motion.p
                        className="text-foreground/50 text-xl mb-16"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        Built for business owners, employees, and clients streamline job
                        scheduling, service tracking, and team management in one powerful
                        app.
                    </motion.p>
                    <motion.div
                        className="flex items-center gap-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                    >
                        <motion.img
                            src="/banner/app-store.svg"
                            alt="App Store"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                        />
                        <motion.img
                            src="/banner/play-store.svg"
                            alt="Play Store"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        />
                    </motion.div>
                </motion.div>

                {/* Right Side */}
                <motion.div
                    initial={{ x: 150, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: "spring", stiffness: 70, delay: 0.3 }}
                >
                    <motion.div
                        initial={{ rotate: 10 }}
                        animate={{ rotate: 0 }}
                        transition={{
                            duration: 2,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    >
                        <Image
                            src={"/banner/banner-image.png"}
                            width={400}
                            height={100}
                            alt="banner image"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
