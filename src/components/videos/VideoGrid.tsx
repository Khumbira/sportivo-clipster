
import React from 'react';
import { Video } from '@/types';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  title?: string;
  emptyMessage?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  title, 
  emptyMessage = "No videos found" 
}) => {
  return (
    <div>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 bg-secondary/30 rounded-lg">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
