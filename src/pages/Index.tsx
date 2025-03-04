
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import RecentUploads from '@/components/dashboard/RecentUploads';
import VideoGrid from '@/components/videos/VideoGrid';
import UploadArea from '@/components/upload/UploadArea';
import { mockStats, mockVideos } from '@/utils/mockData';
import Button from '@/components/common/Button';
import { Plus, Filter, ChevronDown, Grid, List, ArrowUpCircle } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  
  const handleFilesSelected = (files: FileList) => {
    console.log('Files selected:', files);
    toast.success(`${files.length} videos uploaded successfully`);
    setUploadModalOpen(false);
  };
  
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage and organize your sports video content
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
              rightIcon={<ChevronDown size={14} />}
            >
              Filter
            </Button>
            
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => setUploadModalOpen(true)}
            >
              Upload Video
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <RecentUploads videos={mockVideos.slice(0, 4)} />
          </div>
          
          <div className="glass-panel p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Upload</h2>
            <UploadArea 
              onFilesSelected={handleFilesSelected}
              className="mb-4"
            />
            <p className="text-xs text-muted-foreground text-center mt-2">
              Drag & drop videos for quick upload or use the upload button for more options
            </p>
          </div>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Recent Uploads</h2>
          
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <span className="text-sm text-muted-foreground mr-2">View:</span>
            <div className="flex border rounded-md overflow-hidden">
              <button
                className={`px-3 py-1.5 flex items-center ${
                  view === 'grid' 
                    ? 'bg-secondary text-foreground' 
                    : 'bg-transparent text-muted-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setView('grid')}
              >
                <Grid size={16} className="mr-1" />
                <span className="text-xs font-medium">Grid</span>
              </button>
              <button
                className={`px-3 py-1.5 flex items-center ${
                  view === 'list' 
                    ? 'bg-secondary text-foreground' 
                    : 'bg-transparent text-muted-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setView('list')}
              >
                <List size={16} className="mr-1" />
                <span className="text-xs font-medium">List</span>
              </button>
            </div>
          </div>
        </div>
        
        <VideoGrid videos={mockVideos} />
        
        {/* Upload Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
            <div className="bg-background rounded-lg w-full max-w-2xl overflow-hidden animate-scale-in">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Upload Videos</h2>
                  <button 
                    onClick={() => setUploadModalOpen(false)}
                    className="p-1 rounded-full hover:bg-secondary"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <UploadArea 
                  onFilesSelected={handleFilesSelected}
                  className="mb-6"
                />
                
                <div className="flex items-center justify-center border-t mt-6 pt-6">
                  <Button
                    variant="outline"
                    className="mr-4"
                    onClick={() => setUploadModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<ArrowUpCircle size={16} />}
                    onClick={() => {
                      toast.info("Please select files to upload first");
                    }}
                  >
                    Upload Files
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
