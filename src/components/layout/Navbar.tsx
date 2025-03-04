
import React from 'react';
import { Menu, User, ChevronDown } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import NotificationDropdown from '../notifications/NotificationDropdown';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b bg-background/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-md hover:bg-secondary transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        
        <h1 className="font-semibold text-lg hidden md:block">SportClip</h1>
      </div>
      
      <div className="flex-1 max-w-md mx-4">
        <SearchBar 
          onSearch={(term) => console.log('Searching for:', term)} 
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <NotificationDropdown />
        
        <div className="flex items-center">
          <button className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-secondary transition-colors">
            <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden md:block text-sm font-medium">John Smith</span>
            <ChevronDown size={16} className="hidden md:block" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
