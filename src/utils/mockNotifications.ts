
import { Notification } from '../types/notification';

// Helper to format date to be X days ago
const minutesAgo = (minutes: number): Date => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date;
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Upload Complete',
    message: 'Championship Winning Goal has been successfully uploaded.',
    timestamp: minutesAgo(5),
    read: false,
    type: 'success',
    link: '/video/1'
  },
  {
    id: '2',
    title: 'Storage Warning',
    message: 'You\'re reaching 80% of your storage limit. Consider upgrading your plan.',
    timestamp: minutesAgo(30),
    read: false,
    type: 'warning'
  },
  {
    id: '3',
    title: 'Processing Failed',
    message: 'Basketball Slam Dunk Compilation failed to process. Please try uploading again.',
    timestamp: minutesAgo(120),
    read: true,
    type: 'error'
  },
  {
    id: '4',
    title: 'New Comment',
    message: 'John Smith commented on your Tennis Match Point video.',
    timestamp: minutesAgo(240),
    read: true,
    type: 'info',
    link: '/video/3'
  },
  {
    id: '5',
    title: 'Video Trending',
    message: 'Your Swimming Championship Finish video is trending in Sports category!',
    timestamp: minutesAgo(300),
    read: true,
    type: 'success',
    link: '/video/4'
  }
];

// Helper function to format the notification time
export function formatNotificationTime(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
}
