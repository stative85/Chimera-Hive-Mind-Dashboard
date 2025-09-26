export enum GaitMode {
  STAND = 'STAND',
  WALK = 'WALK',
  RUN = 'RUN',
  CROUCH = 'CROUCH',
  ADAPT = 'ADAPT'
}

export interface LimbData {
  hip: number;
  knee: number;
}

export interface SensorDataPoint {
  time: number;
  cadence: number;
  strain: number;
  vibration: number;
}

export interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  source: string;
}

export interface ChimeraSimulationState {
  sensorHistory: SensorDataPoint[];
  currentCadence: number;
  currentStrain: number;
  gaitMode: GaitMode;
  phaseLock: boolean;
  hiveHarmony: number;
  leftLimb: LimbData;
  rightLimb: LimbData;
  systemLog: LogEntry[];
  activeRite: string;
  torque: number;
  powerCoreCharge: number;
  actuatorTemp: number;
}