
import React, { useRef, useEffect } from 'react';
import type { LogEntry } from '../types';

interface SystemLogProps {
  log: LogEntry[];
  activeRite: string;
}

export const SystemLog: React.FC<SystemLogProps> = ({ log, activeRite }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [log]);

  return (
    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm shadow-lg shadow-cyan-500/5 h-[28rem] flex flex-col">
      <div className="flex justify-between items-baseline border-b border-cyan-800/50 pb-2 mb-2">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            System Log // Hive Chorus
        </h3>
        <p className="text-xs text-purple-300 animate-pulse text-right">
            Active Rite: <span className="font-bold">{activeRite}</span>
        </p>
      </div>
      <div ref={scrollRef} className="flex-grow overflow-y-auto pr-2">
        {log.map((entry) => (
          <div key={entry.id} className="text-xs mb-1 flex">
            <span className="text-gray-500 mr-2">{entry.timestamp}</span>
            <span className="text-cyan-400 mr-2 font-bold">{`[${entry.source}]`}</span>
            <span className="text-gray-300 flex-1">{entry.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
