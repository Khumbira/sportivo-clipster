
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Video } from '@/types';
import { mockVideos } from '@/utils/mockData';
import { ChevronLeft } from 'lucide-react';
import NotFoundView from '@/components/video/NotFoundView';
import VideoPreview from '@/components/video/VideoPreview';
import VideoMetadata from '@/components/video/VideoMetadata';

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const video = mockVideos.find(v => v.id === id) as Video;

  if (!video) {
    return (
      <MainLayout>
        <NotFoundView />
      </MainLayout>
    );
  }

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
          <VideoPreview video={video} />
          <VideoMetadata video={video} />
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoDetail;
