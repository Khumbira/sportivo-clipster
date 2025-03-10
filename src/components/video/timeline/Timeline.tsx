
import React, { useRef } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDuration } from '@/utils/mockData';

interface TimelineProps {
  currentTime: number;
  duration: number;
  thumbnails: string[];
  zoomLevel: number;
  increaseZoom: () => void;
  decreaseZoom: () => void;
  isClipping: boolean;
  clipStart: number;
  clipEnd: number;
  onTimelineClick: (newTime: number) => void;
  onClipEndChange: (newTime: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  currentTime,
  duration,
  thumbnails,
  zoomLevel,
  increaseZoom,
  decreaseZoom,
  isClipping,
  clipStart,
  clipEnd,
  onTimelineClick,
  onClipEndChange
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const getVisibleTimeRange = () => {
    const totalDuration = duration;
    const visibleDuration = totalDuration / zoomLevel;
    
    let startTime = currentTime - (visibleDuration / 2);
    let endTime = currentTime + (visibleDuration / 2);
    
    if (startTime < 0) {
      startTime = 0;
      endTime = visibleDuration;
    }
    
    if (endTime > totalDuration) {
      endTime = totalDuration;
      startTime = Math.max(0, totalDuration - visibleDuration);
    }
    
    return { startTime, endTime, visibleDuration };
  };

  const { startTime, endTime } = getVisibleTimeRange();

  const getPlayheadPosition = () => {
    if (duration === 0) return '0%';
    const { startTime, endTime } = getVisibleTimeRange();
    const position = ((currentTime - startTime) / (endTime - startTime)) * 100;
    return `${Math.max(0, Math.min(100, position))}%`;
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = startTime + clickPosition * (endTime - startTime);
    
    if (isClipping) {
      onClipEndChange(newTime);
    } else {
      onTimelineClick(newTime);
    }
  };

  // Calculate positions for clip markers
  const getClipStartPosition = () => {
    if (clipStart < startTime || clipStart > endTime) return null;
    return `${((clipStart - startTime) / (endTime - startTime)) * 100}%`;
  };

  const getClipEndPosition = () => {
    if (clipEnd < startTime || clipEnd > endTime) return null;
    return `${((clipEnd - startTime) / (endTime - startTime)) * 100}%`;
  };

  return (
    <>
      <div 
        ref={timelineRef}
        className="relative w-full h-[120px] bg-[#212428] rounded-md border border-[#2A2E35] overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-6 border-b border-[#2A2E35] flex items-center px-2 text-xs text-gray-400">
          <div className="w-full flex justify-between">
            <span>{formatDuration(startTime)}</span>
            <span>{formatDuration((startTime + endTime) / 2)}</span>
            <span>{formatDuration(endTime)}</span>
          </div>
        </div>
        
        <div className="absolute top-6 left-0 right-0 h-16 px-2 py-1">
          <div className="flex h-full" style={{ width: `${100 * zoomLevel}%`, transform: `translateX(-${((startTime / duration) * 100 * zoomLevel)}%)` }}>
            {thumbnails.map((thumb, index) => (
              <div 
                key={index} 
                className="h-full flex-shrink-0 border border-[#2A2E35]" 
                style={{ width: `${(10 / duration) * 100}%` }}
              >
                <img 
                  src={thumb} 
                  alt={`Thumbnail ${index}`} 
                  className="h-full w-full object-cover opacity-70"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute top-6 left-0 right-0 h-16">
          {(isClipping || clipStart !== 0) && (
            <>
              <div 
                className="absolute h-full bg-black/50" 
                style={{ 
                  left: '0%', 
                  width: getClipStartPosition() || '0%',
                  display: clipStart < startTime ? 'none' : 'block' 
                }} 
              />
              
              <div 
                className="absolute h-full bg-primary/30 border-l-2 border-r-2 border-primary" 
                style={{ 
                  left: getClipStartPosition() || '0%',
                  width: `${
                    ((Math.min(clipEnd, endTime) - Math.max(clipStart, startTime)) / 
                    (endTime - startTime)) * 100
                  }%`,
                  display: (clipStart > endTime || clipEnd < startTime) ? 'none' : 'block'
                }} 
              />
              
              <div 
                className="absolute h-full bg-black/50" 
                style={{ 
                  left: getClipEndPosition() || '100%', 
                  right: '0',
                  display: clipEnd > endTime ? 'none' : 'block' 
                }} 
              />

              {isClipping && getClipStartPosition() && (
                <div 
                  className="absolute top-0 h-full w-0.5 bg-primary z-10"
                  style={{ left: getClipStartPosition() || '0%' }}
                >
                  <div className="w-3 h-3 rounded-full bg-primary -ml-[5px] -mt-[5px]"></div>
                </div>
              )}

              {isClipping && getClipEndPosition() && (
                <div 
                  className="absolute top-0 h-full w-0.5 bg-primary z-10 cursor-ew-resize"
                  style={{ left: getClipEndPosition() || '100%' }}
                >
                  <div className="w-4 h-4 rounded-full bg-primary border-2 border-white -ml-[7px] -mt-[7px]"></div>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="absolute bottom-2 left-2 right-2 h-8 flex items-center">
          <div 
            className="w-full h-6 bg-[#212428] rounded-sm overflow-hidden flex items-center"
            style={{ width: `${100 * zoomLevel}%`, transform: `translateX(-${((startTime / duration) * 100 * zoomLevel)}%)` }}
          >
            <div className="w-full h-4 flex items-center justify-around px-1">
              {Array.from({ length: 100 }).map((_, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "w-1 rounded-full", 
                    index % 3 === 0 ? "h-4" : index % 2 === 0 ? "h-3" : "h-2",
                    currentTime / duration > index / 100 ? "bg-primary" : "bg-[#3A3E45]"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div 
          className="absolute top-6 bottom-0 w-0.5 bg-white z-10 pointer-events-none"
          style={{ left: getPlayheadPosition() }}
        >
          <div className="w-3 h-3 rounded-full bg-white -ml-[5px] -mt-[5px]"></div>
        </div>
        
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={handleTimelineClick}
        />
      </div>

      <div className="flex items-center space-x-3 justify-end mt-2">
        <button 
          onClick={decreaseZoom}
          className="p-1.5 rounded-full bg-[#2A2E35] hover:bg-[#3A3E45] text-white"
          title="Zoom out"
        >
          <ZoomOut size={18} />
        </button>
        
        <button 
          onClick={increaseZoom}
          className="p-1.5 rounded-full bg-[#2A2E35] hover:bg-[#3A3E45] text-white"
          title="Zoom in"
        >
          <ZoomIn size={18} />
        </button>
      </div>
    </>
  );
};

export default Timeline;
