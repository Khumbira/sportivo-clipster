
import React from 'react';
import { 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Bell, 
  ExternalLink
} from 'lucide-react';
import { Notification } from '@/types/notification';
import { formatNotificationTime } from '@/utils/mockNotifications';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
  compact?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onClick,
  compact = false
}) => {
  const { id, title, message, timestamp, read, type, link } = notification;
  
  const getIcon = () => {
    switch (type) {
      case 'info':
        return <Info className={cn("text-blue-500", compact ? "h-4 w-4" : "h-5 w-5")} />;
      case 'success':
        return <CheckCircle className={cn("text-green-500", compact ? "h-4 w-4" : "h-5 w-5")} />;
      case 'warning':
        return <AlertTriangle className={cn("text-amber-500", compact ? "h-4 w-4" : "h-5 w-5")} />;
      case 'error':
        return <XCircle className={cn("text-destructive", compact ? "h-4 w-4" : "h-5 w-5")} />;
      default:
        return <Bell className={cn("text-muted-foreground", compact ? "h-4 w-4" : "h-5 w-5")} />;
    }
  };
  
  const Container = link ? Link : 'div';
  const containerProps = link ? { to: link } : {};

  return (
    <Container
      {...containerProps}
      onClick={onClick}
      className={cn(
        "relative flex gap-3 p-3 transition-colors hover:bg-muted/50 rounded-md",
        !read && "bg-muted/30",
        compact ? "py-2" : ""
      )}
    >
      {!read && (
        <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary"></span>
      )}
      
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className={cn(
            "font-medium text-foreground line-clamp-1", 
            compact ? "text-sm" : "text-base"
          )}>
            {title}
          </h4>
          {!compact && (
            <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
              {formatNotificationTime(timestamp)}
            </span>
          )}
        </div>
        
        <p className={cn(
          "text-muted-foreground line-clamp-2", 
          compact ? "text-xs" : "text-sm"
        )}>
          {message}
        </p>
        
        {compact && (
          <span className="text-xs text-muted-foreground mt-1">
            {formatNotificationTime(timestamp)}
          </span>
        )}
        
        {link && !compact && (
          <div className="flex items-center mt-1 text-xs text-primary">
            <span>View details</span>
            <ExternalLink className="ml-1 h-3 w-3" />
          </div>
        )}
      </div>
    </Container>
  );
};

export default NotificationItem;
