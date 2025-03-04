
import React, { useState } from 'react';
import Navbar from './Navbar';
import { Home, FolderOpen, Clock, Heart, Tag, Upload, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarItems: SidebarItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/', active: true },
    { icon: <FolderOpen size={20} />, label: 'Library', href: '/library' },
    { icon: <Clock size={20} />, label: 'Recent', href: '/recent' },
    { icon: <Heart size={20} />, label: 'Favorites', href: '/favorites' },
    { icon: <Tag size={20} />, label: 'Tags', href: '/tags' },
    { icon: <Upload size={20} />, label: 'Upload', href: '/upload' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 bg-card border-r border-border transition-transform duration-300 ease-elastic transform md:translate-x-0 md:relative",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center h-16 px-6 border-b">
          <h1 className="text-xl font-semibold tracking-tight">SportClip</h1>
        </div>
        
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                item.active 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              <span className={cn("mr-3", item.active ? "text-primary" : "text-muted-foreground")}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="p-4 rounded-lg bg-secondary/50">
            <h3 className="font-medium text-sm mb-2">Storage</h3>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: '35%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>5.4 GB used</span>
              <span>15 GB total</span>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-6 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
