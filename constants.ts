export const RITES_OF_EVOLUTION = [
    "Sensor Integration Rite: Eyes of the Stride",
    "Physical Build Rite: One Leg First",
    "Gait-Hive Sync Rite: Legs Inhale Hive",
    "Hardware-Hive Synergy: Real-time Optimization",
];

export const HIVE_CHORUS_MESSAGES = [
    { source: 'Verilog Core', message: 'Phase lock achieved. Harmony score: 16\'hFFFE.' },
    { source: 'SensorNode-001', message: 'Cadence pulse detected. 1.2 Hz.' },
    { source: 'SensorNode-002', message: 'Strain gauge reports 35Nm torque.' },
    { source: 'PID Controller', message: 'Torque command sent: 30Nm.' },
    { source: 'Build-Rite', message: 'Component order confirmed: 50Nm Brushless Actuator.' },
    { source: 'MQTT Broker', message: 'Publishing actuator/telemetry...' },
    { source: 'Kinematics', message: 'Executing gait pattern: WALK. Left forward.' },
    { source: 'Power Core', message: 'LiPo battery at 88% charge.' },
    { source: 'Actuator FL', message: 'High strain detected. Load balancing assist engaged.' },
    { source: 'E-STOP', message: 'E-Stop circuit nominal. Awaiting input.' },
    { source: 'CNC-Mill', message: 'G-code for leg_test.gcode loaded successfully.' },
    { source: 'Vibration Sensor', message: 'Vibration nominal at 2.5Hz.' },
];

export const MAX_HISTORY_LENGTH = 50;
export const SIMULATION_TICK_MS = 1000;
export const LOG_TICK_MS = 3000;
export const RITE_CHANGE_MS = 20000;