
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { mockVideos, mockCategories } from '@/utils/mockData';
import SearchBar from '@/components/common/SearchBar';
import VideoGrid from '@/components/videos/VideoGrid';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, SortDesc, GridIcon, ListIcon } from 'lucide-react';
import LibraryCategories from '@/components/library/LibraryCategories';
import EmptyLibrary from '@/components/library/EmptyLibrary';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter videos based on search term and active category
  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeTab === 'all' || video.category?.toLowerCase() === activeTab.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Library</h1>
            <p className="text-muted-foreground mt-1">
              Browse and manage your video collection
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <SortDesc size={16} className="mr-2" />
              Sort
            </Button>
            
            <div className="flex border rounded-md overflow-hidden">
              <button
                className={`px-3 py-1.5 flex items-center ${
                  view === 'grid' 
                    ? 'bg-secondary text-foreground' 
                    : 'bg-transparent text-muted-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setView('grid')}
              >
                <GridIcon size={16} className="mr-1" />
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
                <ListIcon size={16} className="mr-1" />
                <span className="text-xs font-medium">List</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar with categories */}
          <div className="lg:col-span-1">
            <LibraryCategories 
              activeCategory={activeTab}
              onCategoryChange={setActiveTab}
            />
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <SearchBar 
                onSearch={setSearchTerm} 
                placeholder="Search by title, tag, or category..."
                className="w-full"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="w-full flex overflow-x-auto no-scrollbar mb-4">
                <TabsTrigger value="all">All Videos</TabsTrigger>
                {mockCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.name.toLowerCase()}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                {filteredVideos.length > 0 ? (
                  <VideoGrid 
                    videos={filteredVideos} 
                    emptyMessage="No videos found in this category"
                  />
                ) : (
                  <EmptyLibrary searchTerm={searchTerm} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Library;
