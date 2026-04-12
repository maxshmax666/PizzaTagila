import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

function AppShell({ children }: AppShellProps) {
  return <div className="pt-shell">{children}</div>;
}

export default AppShell;
