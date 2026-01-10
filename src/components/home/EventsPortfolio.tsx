import { ArrowRight, MapPin, Calendar, Clock, Sparkles, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EventDrawer from "./EventDrawer";

const eventData = [
    {
        id: 1,
        title: "Winter Art Royale",
        season: "W.A.R",
        status: "ongoing",
        category: "National",
        description: "Daami Event presents Winter Art Royale - W.A.R. The ultimate winter creative showdown. Unleash your creativity this season.",
        date: "Live Now",
        location: "Online",
        image: "https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg",
        link: "/indiancreativestar/v2",
        color: "text-blue-300 border-blue-300"
    },
    {
        id: 2,
        title: "Sikkim Creative Star",
        season: "Season 2",
        status: "upcoming",
        category: "Regional",
        description: "The biggest regional art hunt returns. Bigger stage, better prizes. Coming to Gangtok soon.",
        date: "Coming Soon",
        location: "Sikkim, India",
        image: "https://i.ibb.co/SDwFD23N/PHOTO-2025-10-27-20-05-20.webp",
        link: "#",
        color: "text-blue-400 border-blue-400",
        reviews: [
            { name: "Ojashwi Pakhrin", rating: 4, comment: "Thank you for this wonderful opportunity to represent myself. In my opinion next time there should also be a second and third place in the kids category.", verified: true },
            { name: "Kewal Rai", rating: 4, comment: "You guys are doing great just keep organising competition like this so artist's can improve more", verified: true },
            { name: "Biswajyoti Sarma", rating: 5, comment: "Good experience", verified: true },
            { name: "Satish Paswan", rating: 5, comment: "It was a wonderful experience participating in this creative art competition. The platform gave artists like me an opportunity to express our creativity.", verified: true },
            { name: "Nimesh Rai", rating: 5, comment: "This competition was a wonderful experience for me. I not only got a chance to showcase my art but also learned so much throughout the journey.", verified: true },
            { name: "Gracy Kami (Ghimiray)", rating: 5, comment: "Thank you for giving us this opportunity 🙏🙏 I really enjoyed it ☺️ I want to participate in future also.", verified: true },
            { name: "Shashi Bhusan Thakur", rating: 5, comment: "I got excellent platform for my Art work and recognise with all. Thank you so much.", verified: true },
            { name: "Aakriti Thakur", rating: 5, comment: "Very good opportunity for kids, thank you.", verified: true },
            { name: "Mngma Tamang", rating: 4, comment: "It was really good ,and it can help us to next competitive level thankyou to daami events", verified: true },
            { name: "Pramita Pradhan", rating: 4, comment: "This was my first art competition, and as a beginner who loves painting, the experience has been truly wonderful.", verified: true },
            { name: "Yonten Phuntshok Tamang", rating: 5, comment: "It was too good", verified: true }
        ]
    },
    {
        id: 3,
        title: "Guru Art Program",
        season: "Mentorship",
        status: "open",
        category: "Education",
        description: "A specialized program for art teachers and schools to partner with Daami Event.",
        date: "Registrations Open",
        location: "Pan India",
        image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=1974&auto=format&fit=crop",
        link: "/guru/portal",
        color: "text-[#D4AF37] border-[#D4AF37]"
    }
];

const EventsPortfolio = () => {
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleEventClick = (event: any) => {
        if (event.status === 'ongoing' || event.link.startsWith('/')) {
            // If it's the main ongoing event or has a direct internal link, navigate
            navigate(event.link);
        } else {
            // Otherwise open the drawer (for upcoming, past, or non-linked events)
            setSelectedEvent(event);
            setIsDrawerOpen(true);
        }
    };

    const previousEvents = eventData.filter(e => e.status === 'past'); // We'll need to add a 'past' event to data
    const currentEvents = eventData.filter(e => e.status === 'ongoing');
    const upcomingEvents = eventData.filter(e => e.status === 'upcoming' || e.status === 'open'); // Grouping open mentorship with upcoming for now

    // Temporary: Add a mock past event to data if not present (handled in render for now or update data)
    // Actually, let's update the eventData first to be sure.

    return (
        <section className="py-24 px-6 bg-[#0a0a0a] space-y-32" id="events-portfolio">

            {/* 1. PREVIOUS EVENTS - "The Legacy" */}
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                    <div className="space-y-4">
                        <h4 className="text-[#D4AF37] tracking-[0.2em] text-xs font-bold uppercase">Our Legacy</h4>
                        <h2 className="font-playfair text-4xl md:text-5xl text-white">Previous Seasons</h2>
                    </div>
                    <div className="text-right">
                        <p className="text-white/40 text-sm max-w-md">Discover the champions who started their journey with us. Explore the gallery of excellence.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Sikkim Creative Star S1 */}
                    <div
                        onClick={() => { setSelectedEvent({ ...eventData[1], status: 'past', title: 'Sikkim Creative Star S1', season: 'Season 1', description: 'The inaugural season that started it all.', date: 'Completed 2023', image: 'https://i.ibb.co/SDwFD23N/PHOTO-2025-10-27-20-05-20.webp' }); setIsDrawerOpen(true); }}
                        className="group relative bg-[#121212] border border-white/5 hover:border-transparent transition-all duration-500 flex flex-col h-full rounded-md overflow-hidden cursor-pointer gradient-border-glow"
                    >
                        <div className="relative aspect-video w-full overflow-hidden">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                            <img src="https://i.ibb.co/SDwFD23N/PHOTO-2025-10-27-20-05-20.webp" alt="Season 1" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute top-4 left-4 z-20 flex gap-2">
                                <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase border bg-green-900/40 text-green-400 border-green-500/30 backdrop-blur-md rounded-full">COMPLETED</span>
                                <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase border bg-blue-900/40 text-blue-400 border-blue-500/30 backdrop-blur-md rounded-full">STATE LEVEL</span>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-2xl font-playfair text-white mb-1">Sikkim Creative Star</h3>
                                <p className="text-[#D4AF37] text-sm font-lato italic">Season 1 • Regional Excellence</p>
                            </div>

                            {/* Trust Metrics Grid */}
                            <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase text-white/40 tracking-wider">Artists Joined</p>
                                    <p className="text-white font-medium flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#D4AF37]" /> 500+</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase text-white/40 tracking-wider">Prize Pool</p>
                                    <p className="text-white font-medium">₹1 Lakh+</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase text-white/40 tracking-wider">Artworks</p>
                                    <p className="text-white font-medium">800+</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase text-white/40 tracking-wider">Satisfaction</p>
                                    <p className="text-white font-medium text-green-400">98%</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <Button variant="link" className="text-white/40 hover:text-[#D4AF37] p-0 h-auto">View Highlights <ArrowRight className="ml-2 w-4 h-4" /></Button>
                                <div className="flex text-[#D4AF37] gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} className="w-3 h-3 fill-current" />)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Indian Creative Star S1 */}
                    <div
                        onClick={() => { setSelectedEvent({ ...eventData[0], status: 'past', title: 'Indian Creative Star S1', season: 'Season 1', description: 'The first national edition bringing artists together.', date: 'Completed 2024', image: 'https://i.ibb.co/qL29ZCrV/THE-Shakespeare-Poetry-Award-2025-2.webp' }); setIsDrawerOpen(true); }}
                        className="group relative bg-[#121212] border border-white/5 hover:border-transparent transition-all duration-500 flex flex-col h-full rounded-md overflow-hidden cursor-pointer gradient-border-glow"
                    >
                        <div className="relative aspect-video w-full overflow-hidden">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                            <img src="https://i.ibb.co/qL29ZCrV/THE-Shakespeare-Poetry-Award-2025-2.webp" alt="ICS Season 1" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute top-4 left-4 z-20 flex gap-2">
                                <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase border bg-green-900/40 text-green-400 border-green-500/30 backdrop-blur-md rounded-full">COMPLETED</span>
                                <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase border bg-purple-900/40 text-purple-400 border-purple-500/30 backdrop-blur-md rounded-full">NATIONAL LEVEL</span>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-2xl font-playfair text-white mb-1">Indian Creative Star</h3>
                                <p className="text-[#D4AF37] text-sm font-lato italic">Season 1 • National Phenomenon</p>
                            </div>

                            {/* Trust Metrics Grid */}
                            <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase text-white/40 tracking-wider">Artists Joined</p>
                                    <p className="text-white font-medium flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#D4AF37]" /> 12k+</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase text-white/40 tracking-wider">Prize Pool</p>
                                    <p className="text-white font-medium">₹5 Lakh+</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase text-white/40 tracking-wider">Artworks</p>
                                    <p className="text-white font-medium">15k+</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase text-white/40 tracking-wider">Satisfaction</p>
                                    <p className="text-white font-medium text-green-400">4.9/5</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <Button variant="link" className="text-white/40 hover:text-[#D4AF37] p-0 h-auto">View Highlights <ArrowRight className="ml-2 w-4 h-4" /></Button>
                                <div className="flex text-[#D4AF37] gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} className="w-3 h-3 fill-current" />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. CURRENT EVENT - "The Spotlight" */}
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden border border-blue-500/20 group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    {/* Winter Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-black/80 to-transparent z-10"></div>

                    {/* Decorative Snowflakes */}
                    <Snowflake className="absolute top-10 left-[10%] text-white/5 w-24 h-24 animate-bounce duration-[10000ms]" />
                    <Snowflake className="absolute bottom-10 right-[20%] text-white/5 w-32 h-32 animate-pulse duration-[8000ms]" />

                    <img src={eventData[0].image} alt="Current Event" className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 group-hover:scale-105 transition-transform duration-[2000ms]" />

                    <div className="relative z-20 p-8 md:p-16 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-widest uppercase animate-pulse">
                                <span className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60A5FA]"></span> Live Event
                            </div>
                            <h2 className="font-playfair text-5xl md:text-6xl text-white leading-tight drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                {eventData[0].title} <span className="text-blue-300 italic block mt-2 text-4xl md:text-5xl">{eventData[0].season}</span>
                            </h2>
                            <p className="text-xl text-blue-100/80 leading-relaxed max-w-xl">
                                {eventData[0].description}
                            </p>
                            <Button
                                onClick={() => navigate(eventData[0].link)}
                                className="bg-blue-600 text-white hover:bg-white hover:text-blue-900 transition-all duration-500 px-10 py-8 text-lg rounded-none font-playfair hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-blue-500/50"
                            >
                                Enter The Battle <Snowflake className="ml-3 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. UPCOMING EVENTS - "The Future" */}
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                    <div className="space-y-4">
                        <h4 className="text-[#D4AF37] tracking-[0.2em] text-xs font-bold uppercase">Coming Soon</h4>
                        <h2 className="font-playfair text-4xl md:text-5xl text-white">Upcoming Events</h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            className="group relative bg-[#121212] border border-white/5 hover:border-transparent transition-all duration-500 flex flex-col h-full rounded-md overflow-hidden cursor-pointer gradient-border-glow"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase border bg-blue-500/10 text-blue-400 border-blue-500/50 backdrop-blur-md rounded-full">
                                        {event.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="space-y-2 mb-4">
                                    <h3 className="text-2xl font-playfair text-white">{event.title}</h3>
                                    <p className="text-white/40 text-sm font-lato italic">{event.season}</p>
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed mb-6">{event.description}</p>
                                <div className="mt-auto">
                                    <Button className="w-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#B59530] hover:text-black text-white border border-white/10 rounded-none transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                        View Details <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <EventDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                event={selectedEvent}
            />
        </section>
    );
};

export default EventsPortfolio;
