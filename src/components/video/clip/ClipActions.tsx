
import React from 'react';
import { Download, Plus, Play, X } from 'lucide-react';
import { formatDuration } from '@/utils/mockData';
import { Button } from '@/components/ui/button';

interface ClipActionsProps {
  clipStart: number;
  clipEnd: number;
  onDownload: () => void;
  onAddToLibrary: () => void;
  onPreview: () => void;
  onDiscard: () => void;
}

const ClipActions: React.FC<ClipActionsProps> = ({
  clipStart,
  clipEnd,
  onDownload,
  onAddToLibrary,
  onPreview,
  onDiscard
}) => {
  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-primary">Clip Created</span>
          <span className="text-sm text-muted-foreground">
            {formatDuration(clipStart)} - {formatDuration(clipEnd)} 
            ({formatDuration(clipEnd - clipStart)})
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onDiscard}
          className="h-8 w-8"
        >
          <X size={16} />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="default" onClick={onDownload}>
          <Download size={16} className="mr-1.5" />
          <span>Download</span>
        </Button>
        <Button size="sm" variant="outline" onClick={onAddToLibrary}>
          <Plus size={16} className="mr-1.5" />
          <span>Add to Library</span>
        </Button>
        <Button size="sm" variant="secondary" onClick={onPreview}>
          <Play size={16} className="mr-1.5" />
          <span>Preview</span>
        </Button>
      </div>
    </div>
  );
};

export default ClipActions;
