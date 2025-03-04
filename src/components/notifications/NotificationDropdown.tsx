
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from 'lucide-react';
import NotificationItem from './NotificationItem';
import { mockNotifications } from '@/utils/mockNotifications';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NotificationDropdownProps {
  className?: string;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ className }) => {
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button 
          className={cn(
            "relative p-2 rounded-full hover:bg-secondary transition-colors outline-none", 
            className
          )}
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-medium">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 max-h-[400px] overflow-hidden flex flex-col" 
        align="end" 
        sideOffset={8}
      >
        <div className="p-3 border-b flex justify-between items-center">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-7">
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="overflow-y-auto flex-1">
          {mockNotifications.length > 0 ? (
            <div className="divide-y">
              {mockNotifications.slice(0, 5).map((notification) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification}
                  compact
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted-foreground text-sm">No notifications</p>
            </div>
          )}
        </div>
        
        <div className="p-2 border-t">
          <Link to="/notifications">
            <Button variant="outline" className="w-full text-sm h-8">
              View all notifications
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;
