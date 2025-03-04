
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Video } from '@/types';
import { mockVideos } from '@/utils/mockData';
import { 
  ChevronLeft, 
  Clock, 
  FileVideo, 
  Eye, 
  Calendar, 
  Tag, 
  Download, 
  Share2, 
  Edit, 
  Trash2, 
  Info
} from 'lucide-react';
import { formatBytes, formatDuration, formatRelativeTime } from '@/utils/mockData';
import Button from '@/components/common/Button';
import { toast } from 'sonner';

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const video = mockVideos.find(v => v.id === id) as Video;

  if (!video) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <Info size={48} className="text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Video Not Found</h1>
          <p className="text-muted-foreground mb-6">The video you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button variant="primary">Return to Dashboard</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleDownload = () => {
    toast.info("Download started for " + video.title);
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard");
  };

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
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex items-center mb-8">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mr-4">
            <ChevronLeft size={18} />
            <span className="ml-1">Back to dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{video.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Preview */}
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
                  variant="primary" 
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

          {/* Metadata Panel */}
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
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoDetail;
