import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import { Users, Image as ImageIcon, Eye, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const { data } = usePortfolio();

  const stats = [
    { label: 'Total Works', value: data.works.length, icon: ImageIcon, color: 'bg-primary' },
    { label: 'Profile Views', value: '1,245', icon: Eye, color: 'bg-secondary' },
    { label: 'Inquiries', value: '12', icon: Users, color: 'bg-accent' },
    { label: 'Engagement', value: '+24%', icon: TrendingUp, color: 'bg-white dark:bg-black' },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter mb-2">Dashboard</h1>
        <p className="text-black/60 dark:text-white/60">Welcome back, {data.profile.name}. Here's what's happening.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 md:mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-[1.5rem] md:rounded-[2rem] brutal-border brutal-shadow ${stat.color} ${stat.color === 'bg-accent' ? 'text-white' : 'text-black dark:text-white'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-black/10 dark:bg-white/10 rounded-xl">
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-4xl font-display font-bold mb-1">{stat.value}</h3>
              <p className="font-medium uppercase tracking-wider text-sm opacity-80">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-card rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 brutal-border brutal-shadow">
          <h2 className="text-xl md:text-2xl font-display font-bold uppercase mb-6">Recent Works</h2>
          <div className="space-y-4">
            {data.works.slice(0, 3).map(work => (
              <div key={work.id} className="flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:bg-secondary/10 transition-colors">
                <img src={work.imageUrl} alt={work.title} className="w-16 h-16 rounded-lg object-cover brutal-border hidden sm:block" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold truncate">{work.title}</h4>
                  <p className="text-sm opacity-70 truncate">{work.category}</p>
                </div>
                <div className="px-3 py-1 bg-primary/20 rounded-full text-[10px] sm:text-xs font-bold uppercase whitespace-nowrap">
                  {work.featured ? 'Featured' : 'Standard'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 brutal-border brutal-shadow">
          <h2 className="text-xl md:text-2xl font-display font-bold uppercase mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full py-4 px-6 bg-primary text-black font-bold uppercase tracking-widest rounded-xl brutal-border brutal-shadow-hover transition-all text-left text-sm sm:text-base">
              + Add New Work
            </button>
            <button className="w-full py-4 px-6 bg-secondary text-black font-bold uppercase tracking-widest rounded-xl brutal-border brutal-shadow-hover transition-all text-left text-sm sm:text-base">
              Edit Profile
            </button>
            <button className="w-full py-4 px-6 bg-accent text-white font-bold uppercase tracking-widest rounded-xl brutal-border brutal-shadow-hover transition-all text-left text-sm sm:text-base">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
