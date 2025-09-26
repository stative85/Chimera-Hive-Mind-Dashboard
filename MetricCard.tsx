
import React from 'react';

interface MetricCardProps {
  title: string;
  value?: string | number;
  unit?: string;
  children?: React.ReactNode;
  className?: string;
}

const ValueDisplay: React.FC<{ value?: string | number; unit?: string }> = ({ value, unit }) => {
    if (value === undefined) return null;
    return (
        <p className="text-3xl font-bold text-cyan-300">
            {value}
            {unit && <span className="text-lg text-gray-400 ml-1">{unit}</span>}
        </p>
    );
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, children, className }) => {
  return (
    <div className={`bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm shadow-lg shadow-cyan-500/5 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">{title}</h3>
      {children || <ValueDisplay value={value} unit={unit} />}
    </div>
  );
};
