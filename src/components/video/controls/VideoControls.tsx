
import React from 'react';
import { Play, Pause, Volume2, VolumeX, Scissors, Download, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { formatDuration } from '@/utils/mockData';

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isClipping: boolean;
  togglePlay: () => void;
  handleSkipBack: () => void;
  handleSkipForward: () => void;
  toggleMute: () => void;
  handleVolumeChange: (value: number[]) => void;
  startClipping: () => void;
  handleDownload: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isClipping,
  togglePlay,
  handleSkipBack,
  handleSkipForward,
  toggleMute,
  handleVolumeChange,
  startClipping,
  handleDownload
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button 
          onClick={togglePlay}
          className="p-1.5 rounded-full bg-[#2A2E35] hover:bg-[#3A3E45] text-white"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        
        <button 
          onClick={handleSkipBack}
          className="p-1.5 rounded-full bg-[#2A2E35] hover:bg-[#3A3E45] text-white"
        >
          <SkipBack size={18} />
        </button>
        
        <button 
          onClick={handleSkipForward}
          className="p-1.5 rounded-full bg-[#2A2E35] hover:bg-[#3A3E45] text-white"
        >
          <SkipForward size={18} />
        </button>
        
        <div className="flex items-center space-x-1 ml-2">
          <button 
            onClick={toggleMute}
            className="p-1.5 rounded-full bg-[#2A2E35] hover:bg-[#3A3E45] text-white"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="w-20">
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="bg-[#2A2E35]"
            />
          </div>
        </div>

        <div className="text-xs text-gray-400">
          {formatDuration(currentTime)} / {formatDuration(duration)}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={startClipping}
          className={cn(
            "p-1.5 rounded-full text-white", 
            isClipping ? "bg-primary hover:bg-primary/90" : "bg-[#2A2E35] hover:bg-[#3A3E45]"
          )}
          title={isClipping ? "Finish clip" : "Create clip"}
        >
          <Scissors size={18} />
        </button>
        
        <button 
          onClick={handleDownload}
          className="p-1.5 rounded-full bg-[#2A2E35] hover:bg-[#3A3E45] text-white"
          title="Download"
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
};

export default VideoControls;
