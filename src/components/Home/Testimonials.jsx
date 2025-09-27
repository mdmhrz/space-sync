"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Farzana H.",
            role: "Owner, CleanPro Services",
            avatar: "/testimonials/user-1.png",
            testimonial:
                "This app completely changed the way we manage our team. Assigning jobs takes minutes, and we never miss an update.",
        },
        {
            id: 2,
            name: "Ahmed R.",
            role: "Technician",
            avatar: "/testimonials/user-2.png",
            testimonial:
                "I love how easy it is to see my daily tasks and track my time. It makes my job stress-free.",
        },
        {
            id: 3,
            name: "Rafiq M.",
            role: "Homeowner",
            avatar: "/testimonials/user-3.png",
            testimonial:
                "As a client, I love being able to see exactly when my service is on the way. No calls, no guessing — just clear updates.",
        },
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        What Our Users Are Saying
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Real stories from clients, employees, and business owners who use
                        our app every day.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, scale: 0.8, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2,
                                ease: "easeOut",
                            }}
                            whileHover={{ scale: 1.03, rotate: 1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-background border-none h-[260px] shadow-2xl  hover:shadow-md transition-shadow duration-300">
                                <CardContent className="p-8">
                                    {/* User Info */}
                                    <div className="flex items-center gap-4 mb-7">
                                        <Avatar className="w-14 h-14">
                                            <AvatarImage
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                            />
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                {testimonial.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-foreground text-lg">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-muted-foreground text-sm">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        {/* Testimonial Text */}
                                        <motion.p
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                            className="text-muted-foreground leading-relaxed text-base relative z-2"
                                        >
                                            {testimonial.testimonial}
                                        </motion.p>
                                        <motion.img
                                            initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                                            whileInView={{ opacity: 0.15, rotate: 0, scale: 1 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                            className="absolute -top-4 -left-4 z-0"
                                            src="/testimonials/quote.svg"
                                            alt="Quotation Symbol"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
