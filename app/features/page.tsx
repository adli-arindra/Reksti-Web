import Link from "next/link";

export default function FeaturesPage() {
    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
            ),
            title: "Advanced Facial Recognition",
            description: "State-of-the-art AI technology ensures 99.9% accuracy in student identification with anti-spoofing protection.",
            color: "blue",
            benefits: ["Prevents proxy attendance", "Liveness detection", "Works in various lighting", "Sub-second processing"]
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
            ),
            title: "Real-Time Processing",
            description: "Lightning-fast attendance marking with instant verification and immediate data synchronization across all devices.",
            color: "yellow",
            benefits: ["Instant verification", "Live dashboard updates", "Zero latency", "Bulk processing support"]
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
            ),
            title: "Advanced Analytics",
            description: "Comprehensive reporting with predictive insights, attendance patterns, and automated alerts for administrators.",
            color: "purple",
            benefits: ["Predictive analytics", "Custom reports", "Trend analysis", "Automated notifications"]
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
            ),
            title: "Enterprise Security",
            description: "Bank-grade encryption with GDPR compliance, secure data storage, and role-based access control.",
            color: "green",
            benefits: ["End-to-end encryption", "GDPR compliant", "Multi-factor authentication", "Audit trails"]
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                </svg>
            ),
            title: "Cloud Integration",
            description: "Seamless integration with existing systems, API access, and scalable cloud infrastructure.",
            color: "indigo",
            benefits: ["RESTful APIs", "Webhook support", "Auto-scaling", "99.9% uptime SLA"]
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
            ),
            title: "Mobile First Design",
            description: "Optimized mobile experience with offline capabilities and progressive web app technology.",
            color: "pink",
            benefits: ["Offline support", "PWA enabled", "Touch optimized", "Cross-platform"]
        }
    ];

    const integrations = [
        { name: "Google Classroom", logo: "🎓" },
        { name: "Microsoft Teams", logo: "👥" },
        { name: "Zoom", logo: "📹" },
        { name: "Canvas LMS", logo: "🎨" },
        { name: "Blackboard", logo: "📚" },
        { name: "Moodle", logo: "🏫" }
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
            purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
            green: "bg-green-500/10 text-green-400 border-green-500/20",
            indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
            pink: "bg-pink-500/10 text-pink-400 border-pink-500/20"
        };
        // @ts-ignore
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Navigation */}
            <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center">
                            <div className="bg-blue-600 rounded-lg p-2 mr-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-bold">AttendanceX</span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
                            <Link href="/features" className="text-white font-medium">Features</Link>
                            <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
                        </div>

                        <Link href="/" className="text-slate-300 hover:text-white transition-colors flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                            Back
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <span className="text-blue-400 text-sm font-medium">✨ Cutting-Edge Technology</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Powerful Features for
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            Modern Education
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                        Discover the comprehensive suite of tools that make AttendanceX the most advanced
                        attendance management system for educational institutions worldwide.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all group">
                                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${getColorClasses(feature.color)} border group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                                <p className="text-slate-400 mb-6 leading-relaxed">{feature.description}</p>

                                <ul className="space-y-2">
                                    {feature.benefits.map((benefit, idx) => (
                                        <li key={idx} className="text-sm text-slate-300 flex items-center">
                                            <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">Trusted by Thousands</h2>
                        <p className="text-slate-400 text-lg">Numbers that speak for our excellence</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { number: "50K+", label: "Students Managed", icon: "👨‍🎓" },
                            { number: "1.2M+", label: "Attendance Records", icon: "📊" },
                            { number: "99.9%", label: "Accuracy Rate", icon: "🎯" },
                            { number: "500+", label: "Institutions", icon: "🏫" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl mb-4">{stat.icon}</div>
                                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">Seamless Integrations</h2>
                        <p className="text-slate-400 text-lg">Works with your existing educational tools</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {integrations.map((integration, index) => (
                            <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-slate-700 transition-all group">
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{integration.logo}</div>
                                <div className="text-sm text-slate-300 font-medium">{integration.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-12">
                        <h2 className="text-4xl font-bold mb-6 text-white">
                            Ready to Transform Your Attendance System?
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of institutions already using AttendanceX to streamline their attendance management.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/sign-up" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105">
                                Start Free Trial
                            </Link>
                            <Link href="/about" className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:bg-slate-800">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="bg-blue-600 rounded-lg p-2 mr-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-bold">AttendanceX</span>
                        </div>
                        <div className="text-slate-400 text-sm">
                            © 2025 AttendanceX. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}