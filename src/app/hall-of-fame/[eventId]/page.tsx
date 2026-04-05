import { Metadata } from 'next';
import { hallOfFameData } from "@/data/hallOfFameWinners";
import EventHallOfFameClient from "./EventHallOfFameClient";
import { notFound } from 'next/navigation';

interface Props {
    params: { eventId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const event = hallOfFameData.find((e) => e.eventId === params.eventId);
    
    if (!event) {
        return {
            title: "Event Not Found | Daami Event",
        };
    }

    const keywords = [
        event.eventName,
        `${event.eventName} Winners`,
        `${event.eventName} Hall of Fame`,
        "Daami Event Winners",
        "Indian Art Champions",
        ...(event.winners.slice(0, 5).map(w => w.name))
    ];

    return {
        title: `${event.eventName} | Winners Hall of Fame`,
        description: `Explore the official winners and visual highlights of ${event.eventName}. Discover the champions of India's most prestigious online art stage.`,
        keywords: keywords,
        openGraph: {
            title: `${event.eventName} - Hall of Fame | Daami Event`,
            description: event.description,
            images: [
                {
                    url: event.winners[0]?.imageUrl || "https://res.cloudinary.com/dhvzfbhbe/image/upload/v1775290486/THE_Shakespeare_Poetry_Award_2025_1_-compressed_twejlf.webp",
                    width: 1200,
                    height: 630,
                    alt: `${event.eventName} Championship`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${event.eventName} Winners Revealed`,
            description: `Check out the legends of ${event.eventName}.`,
            images: [event.winners[0]?.imageUrl || "https://res.cloudinary.com/dhvzfbhbe/image/upload/v1775290486/THE_Shakespeare_Poetry_Award_2025_1_-compressed_twejlf.webp"],
        },
    };
}

export default function Page({ params }: Props) {
    const currentEvent = hallOfFameData.find((event) => event.eventId === params.eventId);

    if (!currentEvent) {
        notFound();
    }

    return (
        <EventHallOfFameClient 
            currentEvent={currentEvent} 
            eventId={params.eventId} 
            allEvents={hallOfFameData} 
        />
    );
}

export async function generateStaticParams() {
    return hallOfFameData.map((event) => ({
        eventId: event.eventId,
    }));
}
