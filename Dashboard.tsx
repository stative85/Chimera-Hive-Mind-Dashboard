import React from 'react';
import { MetricCard } from './MetricCard';
import { KinematicViewer } from './KinematicViewer';
import { RealtimeChart } from './RealtimeChart';
import { SystemLog } from './SystemLog';
import { GaitStatus } from './GaitStatus';
import type { ChimeraSimulationState } from '../types';

export const Dashboard: React.FC<ChimeraSimulationState> = (props) => {
  const powerColor = props.powerCoreCharge > 50 ? 'bg-green-500' : props.powerCoreCharge > 20 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {/* Main kinematic and status cards */}
      <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
        <KinematicViewer leftLimb={props.leftLimb} rightLimb={props.rightLimb} />
      </div>
      <GaitStatus gaitMode={props.gaitMode} phaseLock={props.phaseLock} />
      <MetricCard title="Hive Harmony">
        <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden">
          <div
            className="bg-cyan-400 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${props.hiveHarmony}%` }}
          ></div>
           <span className="absolute w-full h-full top-0 left-0 text-center text-xs font-bold text-gray-900 mix-blend-screen">{props.hiveHarmony}%</span>
        </div>
      </MetricCard>
      <MetricCard title="Actuator Torque" value={props.torque.toFixed(1)} unit="Nm" />
      <MetricCard title="Core Temp" value={props.actuatorTemp.toFixed(1)} unit="°C" />

      {/* Full-width cards for detailed data */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <MetricCard title="Power Core Charge">
          <div className="w-full bg-gray-700 rounded-full h-5 relative overflow-hidden border border-gray-600">
            <div
              className={`${powerColor} h-full rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${props.powerCoreCharge}%` }}
            ></div>
            <span className="absolute w-full h-full top-0 left-0 text-center text-sm font-bold text-gray-900 mix-blend-screen">{props.powerCoreCharge.toFixed(1)}%</span>
          </div>
        </MetricCard>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-4">
         <RealtimeChart data={props.sensorHistory} />
      </div>
      
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <SystemLog log={props.systemLog} activeRite={props.activeRite} />
      </div>
    </div>
  );
};