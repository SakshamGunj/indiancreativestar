import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WeatherBackground from '@/components/WeatherBackground';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

const WeatherDemo = () => {
  const [weatherType, setWeatherType] = useState<'wet' | 'dry' | 'mixed'>('mixed');

  const weatherOptions = [
    {
      type: 'dry' as const,
      label: 'Dry & Sunny',
      icon: <Sun className="h-6 w-6" />,
      description: 'Clear skies with warm sunshine',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      type: 'wet' as const,
      label: 'Wet & Rainy',
      icon: <CloudRain className="h-6 w-6" />,
      description: 'Heavy rainfall with dark clouds',
      gradient: 'from-blue-600 to-slate-700'
    },
    {
      type: 'mixed' as const,
      label: 'Mixed Weather',
      icon: <Cloud className="h-6 w-6" />,
      description: 'Partly cloudy with light drizzle',
      gradient: 'from-purple-600 to-blue-600'
    }
  ];

  return (
    <WeatherBackground weatherType={weatherType}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
            >
              Dynamic Weather Background
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/80"
            >
              Experience immersive weather effects that change with your selection
            </motion.p>
          </div>

          {/* Weather Selection Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {weatherOptions.map((option, index) => (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    weatherType === option.type
                      ? 'ring-4 ring-white/50 scale-105 bg-white/20'
                      : 'bg-white/10 hover:bg-white/15 hover:scale-102'
                  } backdrop-blur-md border border-white/20`}
                  onClick={() => setWeatherType(option.type)}
                >
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${option.gradient} mb-4`}>
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{option.label}</h3>
                    <p className="text-white/70 text-sm">{option.description}</p>
                    {weatherType === option.type && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4"
                      >
                        <div className="h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full" />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Current Weather Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                {weatherType === 'dry' && <Sun className="h-12 w-12 text-yellow-300" />}
                {weatherType === 'wet' && <CloudRain className="h-12 w-12 text-blue-300" />}
                {weatherType === 'mixed' && <Wind className="h-12 w-12 text-purple-300" />}
                <h2 className="text-3xl font-bold text-white">
                  Current: {weatherOptions.find(o => o.type === weatherType)?.label}
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-white/60 text-sm">Temperature</p>
                  <p className="text-2xl font-bold text-white">
                    {weatherType === 'dry' ? '28°C' : weatherType === 'wet' ? '18°C' : '22°C'}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Humidity</p>
                  <p className="text-2xl font-bold text-white">
                    {weatherType === 'dry' ? '45%' : weatherType === 'wet' ? '85%' : '65%'}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Wind</p>
                  <p className="text-2xl font-bold text-white">
                    {weatherType === 'dry' ? '5 km/h' : weatherType === 'wet' ? '20 km/h' : '12 km/h'}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-white/80 italic">
                  {weatherType === 'dry' && 'Perfect day for outdoor activities! Clear skies and warm sunshine.'}
                  {weatherType === 'wet' && 'Heavy rainfall expected. Stay dry and enjoy the cozy atmosphere.'}
                  {weatherType === 'mixed' && 'Partly cloudy with light drizzle. Good weather for a walk with an umbrella.'}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Dynamic Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Cloud className="h-8 w-8 text-white/60 mx-auto mb-2" />
                <p className="text-white text-sm">Animated Clouds</p>
              </div>
              {weatherType === 'wet' && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <CloudRain className="h-8 w-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white text-sm">Rain Effects</p>
                </div>
              )}
              {weatherType === 'dry' && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Sun className="h-8 w-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white text-sm">Sunshine Particles</p>
                </div>
              )}
              {weatherType === 'mixed' && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Wind className="h-8 w-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white text-sm">Wind Effects</p>
                </div>
              )}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="h-8 w-8 text-white/60 mx-auto mb-2 flex items-center justify-center">
                  <div className="h-4 w-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                </div>
                <p className="text-white text-sm">Gradient Animation</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </WeatherBackground>
  );
};

export default WeatherDemo;