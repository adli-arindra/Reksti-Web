import Link from "next/link";

export default function AboutPage() {
    const team = [
        {
            name: "Givari Al Fachri",
            role: "18222045",
            bio: "",
            image: null, // placeholder for actual image
            linkedin: "https://www.linkedin.com/in/givari-al-fachri-34965b262/"
        },
        {
            name: "Winata Tristan",
            role: "18222061",
            bio: "",
            image: null, // placeholder for actual image
            linkedin: "https://www.linkedin.com/in/winata-tristan-533895214/"
        },
        {
            name: "M. Rafly",
            role: "18222067",
            bio: "",
            image: "/images/rafly.png", // placeholder for actual image
            linkedin: "https://www.linkedin.com/in/muhammad-rafly-05ba3a255/"
        },
        {
            name: "M. Rafi Dhiyaulhaq",
            role: "18222069",
            bio: "",
            image: null, // placeholder for actual image
            linkedin: "https://www.linkedin.com/in/rafidhiyaulh/"
        },
        {
            name: "M. Adli Ariandra",
            role: "18222089",
            bio: "",
            image: "/images/adli.png", // placeholder for actual image
            linkedin: "https://www.linkedin.com/in/adliarindra/"
        }
    ];

    const timeline = [
        {
            year: "2020",
            title: "Founded",
            description: "AttendanceX was born from the need for contactless attendance during the pandemic."
        },
        {
            year: "2021",
            title: "First 100 Schools",
            description: "Reached our first milestone with 100 educational institutions trusting our platform."
        },
        {
            year: "2022",
            title: "AI Breakthrough",
            description: "Achieved 99.9% accuracy with our proprietary facial recognition algorithm."
        },
        {
            year: "2023",
            title: "Global Expansion",
            description: "Expanded to 25+ countries with multi-language support and local compliance."
        },
        {
            year: "2024",
            title: "Enterprise Grade",
            description: "Launched enterprise features serving 500+ institutions and 1M+ students."
        },
        {
            year: "2025",
            title: "The Future",
            description: "Pioneering next-gen biometric authentication and predictive analytics."
        }
    ];

    const values = [
        {
            title: "Innovation First",
            description: "We push the boundaries of what's possible in educational technology.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
            )
        },
        {
            title: "Privacy & Security",
            description: "Student data protection is our highest priority, not an afterthought.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
            )
        },
        {
            title: "User Experience",
            description: "Technology should be invisible - simple, intuitive, and delightful to use.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
            )
        },
        {
            title: "Global Impact",
            description: "Empowering educators worldwide to focus on what matters most - teaching.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            )
        }
    ];

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
                            <Link href="/features" className="text-slate-300 hover:text-white transition-colors">Features</Link>
                            <Link href="/about" className="text-white font-medium">About</Link>
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
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
                        <span className="text-purple-400 text-sm font-medium">🚀 Our Story</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Revolutionizing Education
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                            One Check-In at a Time
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Founded by educators and technologists, AttendanceX was born from a simple belief:
                        technology should enhance learning, not complicate it. We're on a mission to eliminate
                        administrative friction so teachers can focus on what they do best.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                We believe that every minute spent on administrative tasks is a minute stolen from learning.
                                Our mission is to create invisible technology that seamlessly integrates into the educational
                                experience, making attendance tracking effortless, accurate, and secure.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Eliminate manual attendance processes",
                                    "Provide 100% accurate student tracking",
                                    "Ensure complete data privacy and security",
                                    "Enable educators to focus on teaching"
                                ].map((point, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span className="text-slate-300">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/20">
                            <div className="text-center">
                                <div className="text-6xl mb-6">🎯</div>
                                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    A world where educational technology is so intuitive and powerful that it becomes
                                    invisible, allowing human connections and learning to take center stage in every classroom.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">Our Journey</h2>
                        <p className="text-slate-400 text-lg">From startup to industry leader</p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div key={index} className="relative flex items-start">
                                    <div className="flex-shrink-0 w-16 h-16 bg-slate-900 border-4 border-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-blue-400 font-bold">{item.year}</span>
                                    </div>
                                    <div className="ml-8">
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-slate-400">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">Our Values</h2>
                        <p className="text-slate-400 text-lg">The principles that guide everything we do</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-700 transition-all">
                                    <div className="text-blue-400 group-hover:scale-110 transition-transform">
                                        {value.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">Meet Our Team</h2>
                        <p className="text-slate-400 text-lg">The brilliant minds behind AttendanceX</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-all group">
                                {/* Photo placeholder */}
                                <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-slate-600 transition-all overflow-hidden">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                <div className="text-blue-400 text-sm font-medium mb-4">{member.role}</div>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                                <a href={member.linkedin} className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    LinkedIn
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">Recognition & Awards</h2>
                        <p className="text-slate-400 text-lg">Industry acknowledgments of our innovation</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                award: "EdTech Innovation Award 2024",
                                organization: "Global Education Technology Summit",
                                icon: "🏆"
                            },
                            {
                                award: "Best AI Solution in Education",
                                organization: "AI Excellence Awards 2023",
                                icon: "🤖"
                            },
                            {
                                award: "Privacy by Design Certification",
                                organization: "International Data Protection Board",
                                icon: "🔒"
                            },
                            {
                                award: "Startup of the Year",
                                organization: "TechCrunch Disrupt 2022",
                                icon: "🚀"
                            },
                            {
                                award: "Best User Experience Design",
                                organization: "UX Design Awards 2023",
                                icon: "✨"
                            },
                            {
                                award: "Sustainable Tech Initiative",
                                organization: "Green Technology Alliance",
                                icon: "🌱"
                            }
                        ].map((award, index) => (
                            <div key={index} className="bg-slate-800 rounded-xl p-6 text-center hover:bg-slate-700 transition-all">
                                <div className="text-4xl mb-4">{award.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{award.award}</h3>
                                <p className="text-slate-400 text-sm">{award.organization}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-2xl p-12 text-center">
                        <h2 className="text-4xl font-bold mb-6 text-white">Let's Connect</h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                            Have questions about our mission, technology, or want to partner with us?
                            We'd love to hear from you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:hello@attendancex.com" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                Contact Us
                            </a>
                            <Link href="/features" className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:bg-slate-800">
                                Explore Features
                            </Link>
                        </div>

                        <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
                            <div>
                                <h4 className="font-semibold text-white mb-2">Headquarters</h4>
                                <p className="text-slate-400 text-sm">
                                    123 Innovation Drive<br />
                                    Silicon Valley, CA 94043<br />
                                    United States
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-2">Support</h4>
                                <p className="text-slate-400 text-sm">
                                    24/7 Customer Support<br />
                                    support@attendancex.com<br />
                                    +1 (555) 123-ATTEND
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-2">Follow Us</h4>
                                <div className="flex space-x-3">
                                    {[
                                        { name: "Twitter", icon: "🐦" },
                                        { name: "LinkedIn", icon: "💼" },
                                        { name: "GitHub", icon: "⚡" }
                                    ].map((social, index) => (
                                        <a key={index} href="#" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors">
                                            <span className="text-sm">{social.icon}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
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