
import React from 'react';
import { cn } from '@/lib/utils';
import { Category } from '@/types';
import { mockCategories, mockVideos, mockTags } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Tag, Clock, CalendarDays } from 'lucide-react';

interface LibraryCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const LibraryCategories: React.FC<LibraryCategoriesProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="glass-panel p-4 h-fit">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <FolderOpen size={18} className="mr-2" />
        Categories
      </h3>
      
      <div className="space-y-1 mb-6">
        <button
          onClick={() => onCategoryChange('all')}
          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between text-sm ${
            activeCategory === 'all' 
              ? 'bg-primary/10 text-primary font-medium' 
              : 'text-foreground hover:bg-secondary/50'
          }`}
        >
          <span>All Videos</span>
          <Badge variant="secondary" className="ml-2">{mockVideos.length}</Badge>
        </button>
        
        {mockCategories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.name.toLowerCase())}
            className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between text-sm ${
              activeCategory === category.name.toLowerCase() 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'text-foreground hover:bg-secondary/50'
            }`}
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">{category.count}</Badge>
          </button>
        ))}
      </div>
      
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Tag size={18} className="mr-2" />
        Popular Tags
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {mockTags.slice(0, 10).map(tag => (
          <Badge 
            key={tag.id} 
            variant={activeCategory === tag.name.toLowerCase() ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => onCategoryChange(tag.name.toLowerCase())}
          >
            {tag.name} ({tag.count})
          </Badge>
        ))}
      </div>
      
      <h3 className="text-sm font-semibold mb-3 flex items-center text-muted-foreground">
        <Clock size={16} className="mr-2" />
        Time Filters
      </h3>
      
      <div className="space-y-1 mb-6">
        <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary/50">
          Recently Added
        </button>
        <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary/50">
          Recently Viewed
        </button>
        <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary/50">
          Last 7 Days
        </button>
        <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary/50">
          Last 30 Days
        </button>
      </div>
      
      <h3 className="text-sm font-semibold mb-3 flex items-center text-muted-foreground">
        <CalendarDays size={16} className="mr-2" />
        Date Added
      </h3>
      
      <div className="space-y-1">
        <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary/50">
          This Week
        </button>
        <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary/50">
          This Month
        </button>
        <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary/50">
          2023
        </button>
        <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary/50">
          2022
        </button>
      </div>
    </div>
  );
};

export default LibraryCategories;
