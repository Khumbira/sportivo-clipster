
import React from 'react';
import { Info, FileVideo, Edit, Trash2 } from 'lucide-react';
import { Video } from '@/types';
import { formatBytes, formatDuration } from '@/utils/mockData';
import Button from '@/components/common/Button';
import { toast } from 'sonner';

interface VideoMetadataProps {
  video: Video;
}

const VideoMetadata: React.FC<VideoMetadataProps> = ({ video }) => {
  const handleDelete = () => {
    toast.error("This is a demo - video cannot be deleted");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="glass-panel p-6 h-fit">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Info size={18} className="mr-2" />
        Video Information
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3 border-b pb-4">
          <div className="col-span-1 text-sm text-muted-foreground">File name</div>
          <div className="col-span-2 text-sm font-medium truncate">{video.title}.{video.format}</div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-b pb-4">
          <div className="col-span-1 text-sm text-muted-foreground">File type</div>
          <div className="col-span-2 text-sm font-medium flex items-center">
            <FileVideo size={14} className="mr-1.5" />
            {video.format.toUpperCase()} Video
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-b pb-4">
          <div className="col-span-1 text-sm text-muted-foreground">Size</div>
          <div className="col-span-2 text-sm font-medium">{formatBytes(video.size)}</div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-b pb-4">
          <div className="col-span-1 text-sm text-muted-foreground">Resolution</div>
          <div className="col-span-2 text-sm font-medium">{video.resolution}</div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-b pb-4">
          <div className="col-span-1 text-sm text-muted-foreground">Duration</div>
          <div className="col-span-2 text-sm font-medium">{formatDuration(video.duration)}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 border-b pb-4">
          <div className="col-span-1 text-sm text-muted-foreground">Category</div>
          <div className="col-span-2 text-sm font-medium capitalize">{video.category || "Uncategorized"}</div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-b pb-4">
          <div className="col-span-1 text-sm text-muted-foreground">Upload date</div>
          <div className="col-span-2 text-sm font-medium">{formatDate(video.createdAt)}</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1 text-sm text-muted-foreground">Views</div>
          <div className="col-span-2 text-sm font-medium">{video.views}</div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Button 
          variant="outline" 
          className="w-full"
          leftIcon={<Edit size={16} />}
        >
          Edit metadata
        </Button>
        <Button 
          variant="destructive" 
          className="w-full" 
          leftIcon={<Trash2 size={16} />}
          onClick={handleDelete}
        >
          Delete video
        </Button>
      </div>
    </div>
  );
};

export default VideoMetadata;
