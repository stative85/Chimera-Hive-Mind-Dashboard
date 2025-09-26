
import React from 'react';
import type { GaitMode } from '../types';
import { MetricCard } from './MetricCard';

interface GaitStatusProps {
    gaitMode: GaitMode;
    phaseLock: boolean;
}

export const GaitStatus: React.FC<GaitStatusProps> = ({ gaitMode, phaseLock }) => {
    return (
        <MetricCard title="Gait & Phase Sync" className="flex flex-col justify-between">
            <div>
                <p className="text-3xl font-bold text-cyan-300">{gaitMode}</p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
                <span className={`h-3 w-3 rounded-full ${phaseLock ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></span>
                <p className={`text-sm ${phaseLock ? 'text-green-300' : 'text-yellow-300'}`}>
                    {phaseLock ? 'Phase Locked' : 'Syncing...'}
                </p>
            </div>
        </MetricCard>
    );
};
