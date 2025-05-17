import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const artworkItems = [
  {
    id: 1,
    title: "Ephemeral Dreams",
    artist: "Ananya Sharma",
    type: "art",
    imageUrl: "/images/e86eb06b5d4904169f8df31bebe2cb86.jpg",
    likes: 432,
    views: 1204,
  },
  {
    id: 2,
    title: "Urban Canvas",
    artist: "Vikram Singh",
    type: "art",
    imageUrl: "/images/54614b3791b5fd2d60530d9661b3cf80.jpg",
    likes: 521,
    views: 1457,
  },
  {
    id: 3,
    title: "Mystic Forest",
    artist: "Priya Nair",
    type: "art",
    imageUrl: "/images/f0d90b249cd4582aaaeb47b9ecee3c14.jpg",
    likes: 289,
    views: 734,
  },
  {
    id: 4,
    title: "Digital Bloom",
    artist: "Rajiv Mehta",
    type: "art",
    imageUrl: "/images/c9c807abb1b5486218c4f0eeb641414c.jpg",
    likes: 356,
    views: 890,
  },
];

const poemItems = [
  {
    id: 1,
    title: "The Love Without a Name",
    author: "Anonymous Poet",
    content: `She was a prayer, half-said, left incomplete—
A girl whose cradle rocked with silent feet.
No lullabies, just echoes down the hall,
Her father's shadow, never there to fall.

Now in his arms, she seeks that missing part:
The way he holds her stitches up her heart.
But when he whispers, "Darling, you're my own,"
She hears the past weep in his tender tone.

A ghost clings hard—she trembles, kisses twice,
One for the boy, one for the vanished vice.
O Love! Why does your balm still taste of rust?
Why build a home when you're just filling dust?

She'll chase his warmth like matches in the rain—
Each spark a Maybe, doused by Not Again.`,
    likes: 189,
    views: 602,
  },
  {
    id: 2,
    title: "The Alchemy of Her Sorrow",
    author: "Bard of Midnight",
    content: `Each salted pearl that stains her cheek is wrought
In quicksilver, where desperate love is caught—
A molten sonnet, burning as it falls,
A lyric gasped through midnight's ruined walls.

See how her weeping etches time in glass:
The boy, a fool, kneels there to watch it pass,
Drinks every drop like sacramental wine,
Yet trembles—dare he touch what's so divine?

O Love! These are no tears, but liquid fire,
The phoenix-ash of all his lost desire.`,
    likes: 254,
    views: 788,
  },
  {
    id: 3,
    title: "प्रकृति और माँ",
    author: "कवि अज्ञात",
    content: `वो बादलों की गोद में जो चुपके से बोली थी,
हवाओं ने सुन ली, पेड़ों ने समझ ली।
माँ की लोरी सी बहती नदिया,
पर इंसान का बच्चा अब भी रोता है।

फूलों में छुपी मुस्कान उसी की,
पहाड़ों की चुप्पी में वही गीत।
धरती का प्यार, आँचल सा विशाल,
पर छोटे से दिल को कहाँ समझ आए?

सूरज ढले तो माँ बुलाती है,
पर वो अंधेरे से डर जाता है...`,
    likes: 305,
    views: 910,
  },
  {
    id: 4,
    title: "भगवान् का गद्दार / God's Betrayer",
    author: "A Questioner",
    content: `मैंने तोड़ा वो मूरत, जिसने मुझे बनाया था,
(I broke the idol that carved me—clay to clay).

उसकी चुप्पी थी मेरा इम्तिहान,
(His silence was my final exam).

मैं फेल हुआ... या वो अंधा था?
(Did I fail? Or was He blind?)

Prayer beads snapped—क्या धागे थे, क्या गाँठें?
(Rosary undone—what's thread? What's knot?)

अब church की घंटी सुनता हूँ,
(Now I hear the church bell ring,)

पर मेरा दिल है एक burnt-out wick,
(But my heart's a burnt-out wick—no flame, no light).

वो कहता था, "मैं हूँ तेरा Father,"
(He said, "I'm your Father," )

फिर क्यों मेरे सब सवालों के जवाब
(Then why were all my answers...)

...just echoes in an empty nave?
(...सुनाई दिए खाली गुफा में?)

Science ने दिया telescope,
(Science gave me lenses—)

पर दिखा सिर्फ और अंधेरा,
(But showed me deeper darkness).

मैंने पूछा stars से, "तुम हो God?"
(I asked the stars, "Are you Him?" )

They blinked... फिर ख़त्म हो गई रौशनी,
(They blinked—then snuffed their light).

अब मेरी faith है बस एक scar,
(Now my faith is just a scar—)

जो खुजलाता हूँ तो खून निकलता है,
(It itches, bleeds, but won't heal).

Maybe God is the one who left,
(शायद भगवान् वो है जो चला गया,)

या मैं वो बच्चा हूँ जिसे
(Or am I the child who—)

...खुद का पिता भूल गया?
(...got erased from His memory?)

मेरे हाथ में अब बस ashes हैं,
(My hands now hold only ashes—)

No holy books... just dust और एक शिकायत।
(No scripture... just grime and one complaint).`,
    likes: 412,
    views: 1050,
  },
];

export function GallerySection() {
  return (
    <section className="section-padding" id="gallery">
      <div className="container">
        {/* Featured Artworks Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Badge variant="outline" className="mb-2 border-creative-blue/50 text-creative-blue">Featured Art</Badge>
            <h2 className="text-4xl font-bold text-gradient from-creative-blue to-creative-indigo mb-2">Featured Artworks</h2>
            <p className="text-muted-foreground mt-1">Creations from our talented artists</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {artworkItems.map((item) => (
            <Card key={item.id} className="gallery-item group overflow-hidden border-border/30 hover:border-creative-blue/70 transition-all duration-300 shadow-lg hover:shadow-creative-blue/20">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="text-white/70 text-sm">By {item.artist}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-xs">
                  <Badge 
                    variant="outline" 
                    className="bg-creative-blue/10 text-creative-blue border-creative-blue/30"
                  >
                    Artwork
                  </Badge>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {item.likes}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {item.views}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* "More..." text for artworks */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground italic">More...</p>
        </div>

        {/* Featured Poems Section */}
        <div className="mt-16 sm:mt-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <Badge variant="outline" className="mb-2 border-creative-pink/50 text-creative-pink">Featured Words</Badge>
              <h2 className="text-4xl font-bold text-gradient from-creative-pink to-creative-purple mb-2">Featured Poems</h2>
              <p className="text-muted-foreground mt-1">Inspiring verses from our community poets</p>
            </div>
            {/* Consider a 'View All Poems' button if applicable */}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {poemItems.map((poem) => (
              <Card key={poem.id} className="bg-white text-slate-800 p-6 rounded-xl shadow-xl hover:shadow-creative-pink/30 transition-shadow duration-300 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-creative-pink/10 rounded-full mr-3">
                    <BookOpen className="h-5 w-5 text-creative-pink" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-creative-pink">{poem.title}</h3>
                </div>
                <p className="text-xs text-slate-500 mb-1">By {poem.author}</p>
                <div className="text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto flex-grow font-poppins" style={{maxHeight: '250px'}}>
                  {poem.content}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-end text-xs text-slate-500 gap-4">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-creative-pink/70" /> {poem.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5 text-creative-pink/70" /> {poem.views}
                  </span>
                </div>
              </Card>
            ))}
          </div>
          {/* "More..." text for poems */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground italic">More...</p>
          </div>
        </div>
      </div>
    </section>
  );
}
