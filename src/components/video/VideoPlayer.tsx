
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Scissors, Download, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { formatDuration } from '@/utils/mockData';
import { toast } from 'sonner';
import { Video } from '@/types';

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [clipStart, setClipStart] = useState(0);
  const [clipEnd, setClipEnd] = useState(0);
  const [isClipping, setIsClipping] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      setDuration(video.duration);
      setClipEnd(video.duration);
    };
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      video.volume = volume;
    } else {
      video.volume = 0;
    }
    
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleSkipBack = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  const handleSkipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
  };

  const startClipping = () => {
    if (isClipping) {
      // Finish the clip
      if (clipStart >= clipEnd) {
        toast.error("Invalid clip selection. Start time must be before end time.");
        setIsClipping(false);
        return;
      }
      
      toast.success(`Clip created from ${formatDuration(clipStart)} to ${formatDuration(clipEnd)}`);
      setIsClipping(false);
    } else {
      // Start the clip at current position
      setClipStart(currentTime);
      setClipEnd(duration);
      setIsClipping(true);
      toast.info("Select clip end point on the timeline");
    }
  };

  const handleDownload = () => {
    if (isClipping) {
      toast.success(`Downloading clip from ${formatDuration(clipStart)} to ${formatDuration(clipEnd)}`);
    } else {
      toast.success(`Downloading full video: ${video.title}`);
    }
  };

  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-black relative">
      {/* Show clipping overlay if in clipping mode */}
      {isClipping && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-primary/80 text-white p-2 text-sm">
          Creating clip: {formatDuration(clipStart)} to {formatDuration(clipEnd)}. 
          Use the slider to set the end point.
        </div>
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full aspect-video object-contain bg-black"
        poster={video.thumbnailUrl}
      >
        <source src={`/demo-video.mp4`} type={`video/${video.format}`} />
        Your browser does not support the video tag.
      </video>
      
      {/* Timeline */}
      <div className="bg-black text-white p-3 space-y-2">
        {/* Time slider */}
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleTimeChange}
          className={cn("w-full", isClipping ? "bg-primary/30" : "")}
        />
        
        {/* Time indicators */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatDuration(currentTime)}</span>
          <span>{formatDuration(duration)}</span>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={togglePlay}
              className="p-1.5 rounded-full hover:bg-white/20 text-white"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button 
              onClick={handleSkipBack}
              className="p-1.5 rounded-full hover:bg-white/20 text-white"
            >
              <SkipBack size={20} />
            </button>
            
            <button 
              onClick={handleSkipForward}
              className="p-1.5 rounded-full hover:bg-white/20 text-white"
            >
              <SkipForward size={20} />
            </button>
            
            <div className="flex items-center space-x-1 ml-2">
              <button 
                onClick={toggleMute}
                className="p-1.5 rounded-full hover:bg-white/20 text-white"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <div className="w-20">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={startClipping}
              className={cn(
                "p-1.5 rounded-full hover:bg-white/20 text-white", 
                isClipping && "bg-primary/50"
              )}
              title={isClipping ? "Finish clip" : "Create clip"}
            >
              <Scissors size={20} />
            </button>
            
            <button 
              onClick={handleDownload}
              className="p-1.5 rounded-full hover:bg-white/20 text-white"
              title="Download"
            >
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
