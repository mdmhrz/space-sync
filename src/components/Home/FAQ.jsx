"use client";
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
    const faqs = [
        {
            id: "item-1",
            question: "Is the app free to use?",
            answer:
                "Yes! We offer a free plan for individuals and small teams. Paid plans unlock more features for scaling businesses.",
            isOpen: true,
        },
        {
            id: "item-2",
            question: "Can I assign multiple employees to one job?",
            answer:
                "Absolutely! You can assign multiple team members to a single job and track their individual progress and time contributions in real-time.",
            isOpen: false,
        },
        {
            id: "item-3",
            question: "Does it work on both mobile and desktop?",
            answer:
                "Yes, our app is fully responsive and works seamlessly across all devices - mobile phones, tablets, and desktop computers. You can access it through web browsers or download our mobile apps.",
            isOpen: false,
        },
        {
            id: "item-4",
            question: "How do I get started with ScapeSync?",
            answer:
                "Getting started is easy! Simply sign up for a free account, set up your business profile, add your team members, and start creating your first jobs. Our onboarding guide will walk you through each step.",
            isOpen: false,
        },
    ];

    // Motion variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Quick answers to help you get the most out of our app.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Accordion
                        type="single"
                        collapsible
                        defaultValue="item-1"
                        className="w-full space-y-4"
                    >
                        {faqs.map((faq) => (
                            <motion.div key={faq.id} variants={itemVariants}>
                                <AccordionItem
                                    value={faq.id}
                                    className="!border !border-primary/30 rounded-lg px-6 bg-card mb-4 last:mb-0"
                                    style={{ borderBottom: "1px solid hsl(var(--border))" }}
                                >
                                    <AccordionTrigger className="text-left hover:no-underline py-6 text-lg font-medium text-foreground">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
