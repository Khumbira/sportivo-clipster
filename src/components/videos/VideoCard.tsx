
import React from 'react';
import { Video } from '@/types';
import { formatDuration, formatBytes, formatRelativeTime } from '@/utils/mockData';
import { Play, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, className }) => {
  return (
    <div 
      className={cn(
        "overflow-hidden rounded-lg bg-card border border-border hover-card-effect group",
        className
      )}
    >
      <div className="aspect-video relative overflow-hidden bg-secondary/30">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-12 h-12 rounded-full bg-white/80 text-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-white">
              <Play size={24} className="ml-0.5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-base line-clamp-1">{video.title}</h3>
          <button className="p-1 rounded-full hover:bg-secondary/80 -mt-1 -mr-1">
            <MoreVertical size={16} className="text-muted-foreground" />
          </button>
        </div>
        
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <span>{formatBytes(video.size)}</span>
          <span className="mx-1.5">•</span>
          <span>{video.resolution}</span>
          <span className="mx-1.5">•</span>
          <span>{formatRelativeTime(video.createdAt)}</span>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {video.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-secondary px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
          {video.tags.length > 3 && (
            <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
              +{video.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
