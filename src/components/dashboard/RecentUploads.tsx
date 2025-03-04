
import React from 'react';
import { formatDuration, formatRelativeTime } from '@/utils/mockData';
import { Video } from '@/types';
import Button from '../common/Button';
import { MoreHorizontal, Play } from 'lucide-react';

interface RecentUploadsProps {
  videos: Video[];
}

const RecentUploads: React.FC<RecentUploadsProps> = ({ videos }) => {
  return (
    <div className="glass-panel">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Uploads</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </div>
      
      <div>
        {videos.map((video, index) => (
          <div 
            key={video.id}
            className={`flex items-center p-4 ${
              index !== videos.length - 1 ? 'border-b border-border' : ''
            } hover:bg-secondary/20 transition-colors`}
          >
            <div className="relative w-32 h-18 rounded-md overflow-hidden flex-shrink-0 mr-4">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 hover:bg-black/20 transition-colors group">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play size={16} className="text-primary ml-0.5" />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-foreground truncate">{video.title}</h3>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <span>{formatRelativeTime(video.createdAt)}</span>
                <span className="mx-1.5">•</span>
                <span>{video.views} views</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {video.tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="text-xs bg-secondary px-1.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
                {video.tags.length > 2 && (
                  <span className="text-xs bg-secondary px-1.5 py-0.5 rounded">
                    +{video.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
            
            <button className="ml-2 p-1 rounded-md hover:bg-secondary">
              <MoreHorizontal size={18} className="text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUploads;
