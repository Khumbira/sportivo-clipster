
import React from 'react';
import { Clock, Eye, Calendar, Tag, Share2, Download } from 'lucide-react';
import { Video } from '@/types';
import { formatDuration, formatRelativeTime } from '@/utils/mockData';
import Button from '@/components/common/Button';
import { toast } from 'sonner';

interface VideoPreviewProps {
  video: Video;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ video }) => {
  const handleDownload = () => {
    toast.info("Download started for " + video.title);
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard");
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
          <Clock size={14} className="mr-1.5" />
          {formatDuration(video.duration)}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{video.title}</h2>
          <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center">
              <Eye size={16} className="mr-1.5" />
              {video.views} views
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1.5" />
              Uploaded {formatRelativeTime(video.createdAt)}
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            leftIcon={<Share2 size={16} />}
            onClick={handleShare}
          >
            Share
          </Button>
          <Button 
            variant="default" 
            leftIcon={<Download size={16} />}
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        {video.tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="text-xs bg-secondary rounded-full px-2.5 py-1 flex items-center"
          >
            <Tag size={12} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default VideoPreview;
