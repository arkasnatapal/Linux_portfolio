/**
 * ARKA OS — Interactive Ubuntu Linux-Based Digital VLSI Workstation
 * 
 * Root Application Container managing OS lifecycle:
 * Boot Sequence -> Ubuntu GDM Login -> Ubuntu GNOME Desktop Environment
 */

import React, { useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { LoginScreen } from './components/LoginScreen';
import { DesktopEnvironment } from './components/desktop/DesktopEnvironment';
import { ShutdownScreen } from './components/ShutdownScreen';

type SystemState = 'booting' | 'login' | 'desktop' | 'shutdown';

export const App: React.FC = () => {
  const [systemState, setSystemState] = useState<SystemState>('booting');

  return (
    <main className="h-screen w-screen bg-[#10030e] text-slate-100 font-ubuntu overflow-hidden relative flex flex-col select-none">
      {/* Stage 1: Ubuntu Plymouth Boot Sequence */}
      {systemState === 'booting' && (
        <BootScreen onBootComplete={() => setSystemState('login')} />
      )}

      {/* Stage 2: Ubuntu GDM Login Screen */}
      {systemState === 'login' && (
        <LoginScreen
          onLoginSuccess={() => setSystemState('desktop')}
          onShutdown={() => setSystemState('shutdown')}
        />
      )}

      {/* Stage 3: Complete Ubuntu GNOME Desktop Environment */}
      {systemState === 'desktop' && (
        <DesktopEnvironment
          onLogout={() => setSystemState('login')}
          onRestart={() => setSystemState('booting')}
          onShutdown={() => setSystemState('shutdown')}
        />
      )}

      {/* Stage 4: Powered Off Machine State */}
      {systemState === 'shutdown' && (
        <ShutdownScreen onPowerOn={() => setSystemState('booting')} />
      )}
    </main>
  );
};

export default App;
