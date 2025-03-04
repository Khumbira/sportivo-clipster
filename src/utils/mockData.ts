import { Video, StatData, Category, Tag } from '../types';

// Helper to format date to be X days ago
const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Mock videos
export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Championship Winning Goal',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=500&auto=format&fit=crop',
    duration: 24,
    createdAt: daysAgo(0),
    views: 1423,
    tags: ['football', 'goal', 'highlights'],
    size: 45_000_000, // 45MB
    format: 'mp4',
    resolution: '1080p',
    category: 'football'
  },
  {
    id: '2',
    title: 'Basketball Slam Dunk Compilation',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=500&auto=format&fit=crop',
    duration: 135,
    createdAt: daysAgo(1),
    views: 876,
    tags: ['basketball', 'slam dunk', 'highlights'],
    size: 120_000_000, // 120MB
    format: 'mp4',
    resolution: '1080p',
    category: 'basketball'
  },
  {
    id: '3',
    title: 'Tennis Match Point',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=500&auto=format&fit=crop',
    duration: 38,
    createdAt: daysAgo(2),
    views: 543,
    tags: ['tennis', 'match point', 'highlights'],
    size: 60_000_000, // 60MB
    format: 'mp4',
    resolution: '1080p',
    category: 'tennis'
  },
  {
    id: '4',
    title: 'Swimming Championship Finish',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=500&auto=format&fit=crop',
    duration: 42,
    createdAt: daysAgo(3),
    views: 321,
    tags: ['swimming', 'championship', 'highlights'],
    size: 75_000_000, // 75MB
    format: 'mp4',
    resolution: '1080p',
    category: 'swimming'
  },
  {
    id: '5',
    title: 'Rugby Tackle Highlights',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574166465803-a486a13ffd10?q=80&w=500&auto=format&fit=crop',
    duration: 87,
    createdAt: daysAgo(4),
    views: 789,
    tags: ['rugby', 'tackles', 'highlights'],
    size: 95_000_000, // 95MB
    format: 'mp4',
    resolution: '1080p',
    category: 'rugby'
  },
  {
    id: '6',
    title: 'Golf Perfect Swing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=500&auto=format&fit=crop',
    duration: 65,
    createdAt: daysAgo(5),
    views: 432,
    tags: ['golf', 'swing', 'technique'],
    size: 80_000_000, // 80MB
    format: 'mp4',
    resolution: '1080p',
    category: 'golf'
  }
];

// Stats for dashboard
export const mockStats: StatData[] = [
  {
    label: 'Total Videos',
    value: 342,
    change: 12,
    icon: 'Film'
  },
  {
    label: 'Uploads This Month',
    value: 78,
    change: 24,
    icon: 'Upload'
  },
  {
    label: 'Downloads',
    value: 1253,
    change: -5,
    icon: 'Download'
  },
  {
    label: 'Total Tags',
    value: 127,
    change: 8,
    icon: 'Tag'
  }
];

// Categories
export const mockCategories: Category[] = [
  { id: '1', name: 'Football', count: 87 },
  { id: '2', name: 'Basketball', count: 64 },
  { id: '3', name: 'Tennis', count: 45 },
  { id: '4', name: 'Swimming', count: 32 },
  { id: '5', name: 'Rugby', count: 28 },
  { id: '6', name: 'Golf', count: 21 }
];

// Tags
export const mockTags: Tag[] = [
  { id: '1', name: 'highlights', count: 124 },
  { id: '2', name: 'goals', count: 86 },
  { id: '3', name: 'interviews', count: 54 },
  { id: '4', name: 'techniques', count: 43 },
  { id: '5', name: 'events', count: 38 },
  { id: '6', name: 'training', count: 34 }
];

// Helper function to format bytes
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Helper function to format duration
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Helper function to format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}
