import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

function AppShell({ children }: AppShellProps) {
  return (
    <div className="pt-shell">
      <div className="pt-shell__glow" aria-hidden="true" />
      <div className="pt-shell__frame">{children}</div>
    </div>
  );
}

export default AppShell;
