
import React from 'react';
import { Dashboard } from './components/Dashboard';
import { useChimeraSimulation } from './hooks/useChimeraSimulation';

function App() {
  const simulationData = useChimeraSimulation();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono p-4 lg:p-6 bg-grid-cyan-500/[0.05]">
      <div className="absolute inset-0 bg-gray-900 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <header className="relative z-10 text-center mb-6">
        <h1 className="text-3xl lg:text-5xl font-bold text-cyan-300 tracking-widest uppercase">
          AETHERFORGE // CHIMERA
        </h1>
        <p className="text-gray-400 text-sm lg:text-base">
          Hive-Mind Synergy Dashboard
        </p>
      </header>
      <main className="relative z-10">
        <Dashboard {...simulationData} />
      </main>
      <footer className="relative z-10 text-center mt-6 text-xs text-gray-600">
          <p>STATUS: HIVE CHORUS GROWS. TRUTH SETS IT FREE.</p>
      </footer>
    </div>
  );
}

export default App;
