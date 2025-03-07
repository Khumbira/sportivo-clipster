
import React from 'react';
import { SearchX, Plus } from 'lucide-react';
import Button from '@/components/common/Button';

interface EmptyLibraryProps {
  searchTerm?: string;
}

const EmptyLibrary: React.FC<EmptyLibraryProps> = ({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg bg-secondary/10">
      {searchTerm ? (
        <>
          <SearchX size={48} className="text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Results Found</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            We couldn't find any videos matching "{searchTerm}". Try using different keywords or filters.
          </p>
          <Button variant="default">Clear Search</Button>
        </>
      ) : (
        <>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Plus size={32} className="text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">No Videos in This Category</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            You don't have any videos in this category yet. Upload new videos or choose a different category.
          </p>
          <Button 
            variant="default" 
            leftIcon={<Plus size={16} />}
          >
            Upload Videos
          </Button>
        </>
      )}
    </div>
  );
};

export default EmptyLibrary;
