import React, { useState, useEffect } from 'react';
import { MapPin, Clock as ClockIcon } from 'lucide-react';

export const LiveClock: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time in Asia/Kolkata timezone
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        month: 'short',
        day: 'numeric',
        weekday: 'short'
      });

      setTimeString(timeFormatter.format(now));
      setDateString(dateFormatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 glass-pill px-4 py-2 rounded-full text-xs font-mono text-gray-300 shadow-lg border border-purple-500/20">
      <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
        <MapPin className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
        <span>Shivamogga, IN</span>
      </div>
      <span className="text-gray-600">|</span>
      <div className="flex items-center gap-1.5 text-gray-300">
        <ClockIcon className="w-3.5 h-3.5 text-cyan-400" />
        <span>{timeString || "IST"}</span>
        <span className="text-[10px] text-gray-400 font-sans uppercase tracking-wider">({dateString})</span>
      </div>
    </div>
  );
};
