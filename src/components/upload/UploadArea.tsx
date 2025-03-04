
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, FileSymlink, X, Film } from 'lucide-react';
import Button from '../common/Button';

interface UploadAreaProps {
  onFilesSelected: (files: FileList) => void;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  onFilesSelected,
  accept = "video/*",
  maxSize = 1024 * 1024 * 500, // 500MB
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFiles = (files: FileList): boolean => {
    // Check if there are files
    if (files.length === 0) {
      setError("No files selected");
      return false;
    }
    
    // Check file types
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith('video/')) {
        setError("Only video files are allowed");
        return false;
      }
      
      // Check file size
      if (files[i].size > maxSize) {
        setError(`File too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
        return false;
      }
    }
    
    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (validateFiles(e.dataTransfer.files)) {
        onFilesSelected(e.dataTransfer.files);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      if (validateFiles(e.target.files)) {
        onFilesSelected(e.target.files);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className={className}>
      <div
        className={cn(
          "relative h-64 rounded-lg border-2 border-dashed transition-all duration-200 ease-in-out flex flex-col items-center justify-center px-6 py-10 text-center",
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-muted-foreground/40",
          error && "border-red-400 bg-red-50 dark:bg-red-950/10"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          multiple
          className="hidden"
        />
        
        <div className="space-y-2">
          {error ? (
            <>
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
                <X className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-red-500">Upload Error</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearError}
                className="mt-4"
              >
                Try Again
              </Button>
            </>
          ) : (
            <>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Drag & drop your videos</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Upload sports videos up to 500MB. MP4, MOV, and AVI formats supported.
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <Film className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  MP4, MOV, AVI
                </span>
              </div>
              <Button 
                onClick={handleClick}
                variant="outline" 
                size="sm" 
                leftIcon={<FileSymlink size={16} />}
                className="mt-4"
              >
                Select Files
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
