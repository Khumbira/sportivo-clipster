
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NotificationItem from '@/components/notifications/NotificationItem';
import { mockNotifications } from '@/utils/mockNotifications';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Notification } from '@/types/notification';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const clearAll = () => {
    setNotifications([]);
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={clearAll}
                className="flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Clear all
              </Button>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'unread')}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-0">
            {renderNotificationList(filteredNotifications)}
          </TabsContent>
          
          <TabsContent value="unread" className="space-y-0">
            {renderNotificationList(filteredNotifications)}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

function renderNotificationList(notifications: Notification[]) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-medium mb-2">No notifications</h3>
        <p className="text-muted-foreground">You're all caught up!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <div key={notification.id} className="bg-card rounded-lg shadow-sm">
          <NotificationItem notification={notification} />
        </div>
      ))}
    </div>
  );
}

export default Notifications;
