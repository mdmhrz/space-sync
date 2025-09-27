"use client"
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";

const BuildForEveryone = () => {
    const sections = [
        {
            id: 'users',
            badge: 'Users',
            title: 'Book services, track progress and stay updated',
            description: 'Easily schedule appointments, get real-time updates, and enjoy a smooth, transparent service experience.',
            features: [
                'Book services in seconds',
                'Track real-time job updates',
                'Schedule appointments at your convenience'
            ],
            image: '/everyone/mockup-1.png',
            imageAlt: 'Mobile app screenshot for users',
            imagePosition: 'right'
        },
        {
            id: 'business-owners',
            badge: 'Business Owners',
            title: 'Assign jobs, monitor performance, and streamline operations.',
            description: 'Gain full control of your workforce with real-time tracking, smart scheduling, and service management in one app.',
            features: [
                'Assign jobs to the right team member',
                'Monitor performance in real time',
                'Manage clients and services seamlessly'
            ],
            image: '/everyone/mockup-2.png',
            imageAlt: 'Mobile app screenshot for business owners',
            imagePosition: 'left'
        },
        {
            id: 'employees',
            badge: 'Employees',
            title: 'See tasks, track time, and navigate routes with ease.',
            description: 'Everything you need to manage your workday from job assignments to optimized routes and time logging.',
            features: [
                'Assign jobs to the right team member',
                'Monitor performance in real time',
                'Manage clients and services seamlessly'
            ],
            image: '/everyone/mockup-3.png',
            imageAlt: 'Mobile app screenshot for employees',
            imagePosition: 'right'
        }
    ];

    const borderOpacity = (index) => {
        switch (index) {
            case 0: return 'border-primary/80';
            case 1: return 'border-primary/50';
            case 2: return 'border-primary/25';
            default: return 'opacity-95';
        }
    };

    return (
        <div className="py-20 bg-background relative overflow-hidden">
            <img className='hidden lg:block absolute top-11/24 -translate-y-1/2 left-1/2 -translate-x-1/2' src="/everyone/background-center.svg" alt="center-background" />
            <img className='absolute top-7/24 -translate-y-1/2 right-0' src="/everyone/background-right.svg" alt="center-background" />

            <section className='container mx-auto max-w-7xl px-6'>
                <div className="container mx-auto px-6 relative z-10">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className='relative flex flex-col items-center justify-center'>
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                                    Build for Everyone
                                </h2>
                                <img className='place-self-end' src="/everyone/text-background.svg" alt="" />
                            </motion.div>
                        </div>
                        <motion.div
                            className='relative'
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-10">
                                Whether you're booking services, managing tasks, or running operations, we've
                                designed the perfect experience for you.
                            </p>
                            <img className='hidden lg:block absolute left-10' src="/everyone/background-left.svg" alt="" />
                        </motion.div>
                    </motion.div>

                    {/* Sections */}
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            className={`grid lg:grid-cols-2 gap-16 items-center ${index < sections.length - 1 ? 'mb-16' : ''}`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {/* Content */}
                            <motion.div
                                className={section.imagePosition === 'right' ? 'order-1' : 'order-2'}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <Badge variant="secondary" className="text-primary bg-transparent border-primary rounded-full text-md hover:bg-primary/5 mb-6 px-6 flex items-center justify-center">
                                    {section.badge}
                                </Badge>
                                <h3 className="text-3xl font-bold text-foreground mb-4 max-w-lg">
                                    {section.title}
                                </h3>
                                <p className="text-lg text-muted-foreground mb-8">
                                    {section.description}
                                </p>
                                <div className="space-y-4">
                                    {section.features.map((feature, featureIndex) => (
                                        <motion.div
                                            key={featureIndex}
                                            className="flex items-center gap-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: featureIndex * 0.2 }}
                                        >
                                            <span className={`text-foreground font-medium border-l-4 ${borderOpacity(featureIndex)} pl-4`}>
                                                {feature}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Image */}
                            <motion.div
                                className={section.imagePosition === 'right'
                                    ? 'order-1 lg:order-2 flex justify-center'
                                    : 'order-2 lg:order-1 flex justify-center'}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            >
                                <div className="relative inline-block">
                                    <motion.img
                                        src={section.image}
                                        alt={section.imageAlt}
                                        className="w-full h-auto relative z-10"
                                        whileHover={{ scale: 1.05, rotate: 2 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    />
                                    <div
                                        className="absolute z-11 inset-0"
                                        style={{
                                            WebkitMaskImage: `url(${section.image})`,
                                            WebkitMaskRepeat: "no-repeat",
                                            WebkitMaskSize: "cover",
                                            WebkitMaskPosition: "center",
                                            maskImage: `url(${section.image})`,
                                            maskRepeat: "no-repeat",
                                            maskSize: "cover",
                                            maskPosition: "center",
                                            background: "linear-gradient(to top, white, transparent, transparent, transparent)",
                                        }}
                                    />
                                    <div
                                        className={`w-[600px] h-[800px] bg-[#9BFF96]/10 rounded-full absolute top-2/4 z-0 -translate-y-1/2 blur-3xl ${index % 2 === 0 ? "rotate-[135deg] translate-x-[450px]" : "rotate-45 -translate-x-[450px]"}`}
                                    ></div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BuildForEveryone;
