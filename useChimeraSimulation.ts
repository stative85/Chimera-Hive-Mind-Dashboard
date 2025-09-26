import { useState, useEffect } from 'react';
import { GaitMode, ChimeraSimulationState, SensorDataPoint, LogEntry } from '../types';
import { RITES_OF_EVOLUTION, HIVE_CHORUS_MESSAGES, MAX_HISTORY_LENGTH, SIMULATION_TICK_MS, LOG_TICK_MS, RITE_CHANGE_MS } from '../constants';

const initialState: ChimeraSimulationState = {
    sensorHistory: [],
    currentCadence: 0,
    currentStrain: 0,
    gaitMode: GaitMode.STAND,
    phaseLock: false,
    hiveHarmony: 0,
    leftLimb: { hip: 0, knee: 0 },
    rightLimb: { hip: 0, knee: 0 },
    systemLog: [],
    activeRite: RITES_OF_EVOLUTION[0],
    torque: 0,
    powerCoreCharge: 100,
    actuatorTemp: 25,
};

export const useChimeraSimulation = (): ChimeraSimulationState => {
    const [state, setState] = useState<ChimeraSimulationState>(initialState);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const simulationInterval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, SIMULATION_TICK_MS);

        return () => clearInterval(simulationInterval);
    }, []);

    useEffect(() => {
        const logInterval = setInterval(() => {
            const randomMessage = HIVE_CHORUS_MESSAGES[Math.floor(Math.random() * HIVE_CHORUS_MESSAGES.length)];
            const newLog: LogEntry = {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString(),
                message: randomMessage.message,
                source: randomMessage.source
            };

            setState(prevState => ({
                ...prevState,
                systemLog: [newLog, ...prevState.systemLog].slice(0, 100)
            }));
        }, LOG_TICK_MS);

        return () => clearInterval(logInterval);
    }, []);

    useEffect(() => {
        const riteInterval = setInterval(() => {
            setState(prevState => ({
                ...prevState,
                activeRite: RITES_OF_EVOLUTION[Math.floor(Math.random() * RITES_OF_EVOLUTION.length)]
            }));
        }, RITE_CHANGE_MS);

        return () => clearInterval(riteInterval);
    }, []);


    useEffect(() => {
        const cadenceBase = Math.max(0, (Math.sin(time * 0.1) + Math.sin(time * 0.23)) * 1.5);
        const currentCadence = parseFloat(cadenceBase.toFixed(2));
        const currentStrain = parseFloat(Math.max(0, Math.cos(time * 0.2) * 25 + 25 + (Math.random() - 0.5) * 5).toFixed(2));
        
        const torque = parseFloat(Math.max(0, currentStrain * 1.1 + (Math.random() - 0.5) * 5).toFixed(2));
        const actuatorTemp = parseFloat(Math.max(25, 25 + currentStrain * 1.5 + Math.sin(time * 0.05) * 5).toFixed(2));
        const vibration = parseFloat(Math.max(0, currentCadence * 1.5 + (Math.random() - 0.5) * 2).toFixed(2));

        let gaitMode: GaitMode;
        if (currentCadence < 0.2) gaitMode = GaitMode.STAND;
        else if (currentCadence <= 1.5) gaitMode = GaitMode.WALK;
        else if (currentCadence <= 2.5) gaitMode = GaitMode.RUN;
        else gaitMode = GaitMode.ADAPT;

        const phaseLock = currentCadence > 0.5 && Math.random() > 0.1;
        const hiveHarmony = Math.round(phaseLock ? 80 + Math.random() * 20 : 30 + Math.random() * 40);

        const walkCycle = time * currentCadence * 0.5;
        const hipRange = gaitMode === GaitMode.STAND ? 0 : 25;
        const kneeRange = gaitMode === GaitMode.STAND ? 0 : 40;
        
        const leftLimb = {
            hip: Math.sin(walkCycle) * hipRange,
            knee: Math.max(0, Math.cos(walkCycle) * kneeRange),
        };
        const rightLimb = {
            hip: Math.sin(walkCycle + Math.PI) * hipRange,
            knee: Math.max(0, Math.cos(walkCycle + Math.PI) * kneeRange),
        };

        const newSensorData: SensorDataPoint = { time, cadence: currentCadence, strain: currentStrain, vibration };

        setState(prevState => {
            const powerDraw = (currentStrain / 50) * 0.1;
            const newPowerCoreCharge = Math.max(0, prevState.powerCoreCharge - 0.02 - powerDraw);

            return {
                ...prevState,
                currentCadence,
                currentStrain,
                torque,
                actuatorTemp,
                powerCoreCharge: newPowerCoreCharge,
                gaitMode,
                phaseLock,
                hiveHarmony,
                leftLimb,
                rightLimb,
                sensorHistory: [...prevState.sensorHistory, newSensorData].slice(-MAX_HISTORY_LENGTH),
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);


    return state;
};