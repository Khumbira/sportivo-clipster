// utils/mockData.ts
import { Video, StatData, Category, Tag } from '@/types';

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  let formatted = '';
  if (hours > 0) {
    formatted += `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    formatted += `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return formatted;
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Introduction to React',
    thumbnailUrl: '/thumbnails/react.png',
    duration: 150,
    createdAt: new Date(),
    views: 12345,
    tags: ['react', 'javascript', 'tutorial'],
    size: 52428800,
    format: 'mp4',
    resolution: '720p',
    category: 'Tutorials'
  },
  {
    id: '2',
    title: 'Vue.js Crash Course',
    thumbnailUrl: '/thumbnails/vue.png',
    duration: 240,
    createdAt: new Date(),
    views: 67890,
    tags: ['vue', 'javascript', 'crash course'],
    size: 73400320,
    format: 'mp4',
    resolution: '1080p',
    category: 'Tutorials'
  },
  {
    id: '3',
    title: 'Angular for Beginners',
    thumbnailUrl: '/thumbnails/angular.png',
    duration: 180,
    createdAt: new Date(),
    views: 34567,
    tags: ['angular', 'typescript', 'tutorial'],
    size: 62914560,
    format: 'mp4',
    resolution: '720p',
    category: 'Tutorials'
  },
  {
    id: '4',
    title: 'Node.js API Development',
    thumbnailUrl: '/thumbnails/node.png',
    duration: 210,
    createdAt: new Date(),
    views: 45678,
    tags: ['node', 'javascript', 'api'],
    size: 83886080,
    format: 'mp4',
    resolution: '1080p',
    category: 'Backend'
  },
  {
    id: '5',
    title: 'Python Data Analysis',
    thumbnailUrl: '/thumbnails/python.png',
    duration: 300,
    createdAt: new Date(),
    views: 56789,
    tags: ['python', 'data analysis', 'pandas'],
    size: 94371840,
    format: 'mp4',
    resolution: '1080p',
    category: 'Data Science'
  },
  {
    id: '6',
    title: 'JavaScript ES6 Features',
    thumbnailUrl: '/thumbnails/javascript.png',
    duration: 120,
    createdAt: new Date(),
    views: 23456,
    tags: ['javascript', 'es6'],
    size: 41943040,
    format: 'mp4',
    resolution: '720p',
    category: 'Web Development'
  },
  {
    id: '7',
    title: 'Docker Tutorial for Beginners',
    thumbnailUrl: '/thumbnails/docker.png',
    duration: 150,
    createdAt: new Date(),
    views: 78901,
    tags: ['docker', 'devops'],
    size: 52428800,
    format: 'mp4',
    resolution: '720p',
    category: 'DevOps'
  },
  {
    id: '8',
    title: 'Kubernetes Explained',
    thumbnailUrl: '/thumbnails/kubernetes.png',
    duration: 240,
    createdAt: new Date(),
    views: 89012,
    tags: ['kubernetes', 'devops'],
    size: 73400320,
    format: 'mp4',
    resolution: '1080p',
    category: 'DevOps'
  },
  {
    id: '9',
    title: 'Machine Learning Basics',
    thumbnailUrl: '/thumbnails/machinelearning.png',
    duration: 180,
    createdAt: new Date(),
    views: 90123,
    tags: ['machine learning', 'python'],
    size: 62914560,
    format: 'mp4',
    resolution: '720p',
    category: 'Data Science'
  },
  {
    id: '10',
    title: 'Cybersecurity Fundamentals',
    thumbnailUrl: '/thumbnails/cybersecurity.png',
    duration: 210,
    createdAt: new Date(),
    views: 123456,
    tags: ['cybersecurity', 'security'],
    size: 83886080,
    format: 'mp4',
    resolution: '1080p',
    category: 'Security'
  }
];

export const mockStatsData: StatData[] = [
  { label: "Total Videos", value: 120, change: 5, icon: "upload" },
  { label: "Total Views", value: "2.5M", change: 12, icon: "eye" },
  { label: "Total Storage", value: "500 GB", change: 3, icon: "database" },
  { label: "New Subscribers", value: 500, change: 8, icon: "user-plus" },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Tutorials', count: 30 },
  { id: '2', name: 'Product Demos', count: 20 },
  { id: '3', name: 'Explainers', count: 15 },
  { id: '4', name: 'Testimonials', count: 10 },
  { id: '5', name: 'Presentations', count: 25 }
];

export const mockTags = [
  { id: '1', name: 'Tutorial', count: 12 },
  { id: '2', name: 'Product Demo', count: 8 },
  { id: '3', name: 'Explainer', count: 5 },
  { id: '4', name: 'Testimonial', count: 3 },
  { id: '5', name: 'Presentation', count: 7 }
];
