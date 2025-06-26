'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { HRContextProvider } from '../contexts/hr-context';
// import { HRContextProvider } from '@/contexts/hr-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <HRContextProvider>
          {children}
        </HRContextProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}