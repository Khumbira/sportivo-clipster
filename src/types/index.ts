
export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number; // in seconds
  createdAt: Date;
  views: number;
  tags: string[];
  size: number; // in bytes
  format: string;
  resolution: string;
  category?: string;
}

export interface StatData {
  label: string;
  value: string | number;
  change?: number; // percentage change
  icon: string; // Changed from React.ReactNode to string identifier
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}
