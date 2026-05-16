import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  engagementName?: string;
  showSidebar?: boolean;
}

export function Layout({ children, engagementName, showSidebar = true }: LayoutProps) {
  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#0F1419]">
      <Sidebar engagementName={engagementName} />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
