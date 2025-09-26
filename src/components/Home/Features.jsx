import React from 'react';
import { Calendar, Target, BarChart3, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
    const features = [
        {
            icon: Calendar,
            title: "Easy Service Booking",
            description: "Streamlined booking process for clients with service catalogs and availability."
        },
        {
            icon: Target,
            title: "Real-Time Tracking",
            description: "Monitor job progress, employee hours, and project timelines with live updates."
        },
        {
            icon: BarChart3,
            title: "Performance Analytics",
            description: "Comprehensive reporting and insights to improve business operations and efficiency."
        },
        {
            icon: Shield,
            title: "Secure & Reliable",
            description: "Enterprise-grade security with 99.9% uptime guarantee and data protection."
        }
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className="border-none shadow-none bg-transparent relative">
                                <CardContent className="p-0">
                                    {/* Right border for all except last item */}
                                    {index < features.length - 1 && (
                                        <div className="absolute right-0 top-4 bottom-4 w-px bg-border/50 hidden lg:block"></div>
                                    )}
                                    {/* Icon */}
                                    <div className="mb-6">
                                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold text-foreground mb-4">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;