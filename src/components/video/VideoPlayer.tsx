import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Scissors, Download, SkipBack, SkipForward, ZoomIn, ZoomOut } from 'lucide-react';
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
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [clipStart, setClipStart] = useState(0);
  const [clipEnd, setClipEnd] = useState(0);
  const [isClipping, setIsClipping] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  
  useEffect(() => {
    if (duration > 0) {
      const thumbs = [];
      const numThumbs = Math.ceil(duration / 10);
      for (let i = 0; i < numThumbs; i++) {
        thumbs.push(video.thumbnailUrl);
      }
      setThumbnails(thumbs);
    }
  }, [duration, video.thumbnailUrl]);

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
      if (clipStart >= clipEnd) {
        toast.error("Invalid clip selection. Start time must be before end time.");
        setIsClipping(false);
        return;
      }
      
      toast.success(`Clip created from ${formatDuration(clipStart)} to ${formatDuration(clipEnd)}`);
      setIsClipping(false);
    } else {
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

  const increaseZoom = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };

  const decreaseZoom = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

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

  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-black relative">
      {isClipping && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-primary/80 text-white p-2 text-sm">
          Creating clip: {formatDuration(clipStart)} to {formatDuration(clipEnd)}. 
          Use the timeline to set the end point.
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full aspect-video object-contain bg-black"
        poster={video.thumbnailUrl}
      >
        <source src={`/demo-video.mp4`} type={`video/${video.format}`} />
        Your browser does not support the video tag.
      </video>
      
      <div className="bg-[#1A1D21] text-white p-4 space-y-4">
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
            {isClipping && (
              <div className="absolute h-full bg-black/50" style={{ left: '0%', width: `${((clipStart - startTime) / (endTime - startTime)) * 100}%`, display: clipStart < startTime ? 'none' : 'block' }} />
            )}
            
            {isClipping && (
              <div className="absolute h-full bg-primary/30 border-l-2 border-r-2 border-primary" style={{ left: `${Math.max(0, ((clipStart - startTime) / (endTime - startTime)) * 100)}%`, width: `${Math.min(100, ((Math.min(clipEnd, endTime) - Math.max(clipStart, startTime)) / (endTime - startTime)) * 100)}%` }} />
            )}
            
            {isClipping && (
              <div className="absolute h-full bg-black/50" style={{ left: `${((clipEnd - startTime) / (endTime - startTime)) * 100}%`, right: '0', display: clipEnd > endTime ? 'none' : 'block' }} />
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
            onClick={(e) => {
              if (!timelineRef.current) return;
              
              const rect = timelineRef.current.getBoundingClientRect();
              const clickPosition = (e.clientX - rect.left) / rect.width;
              const newTime = startTime + clickPosition * (endTime - startTime);
              
              if (isClipping) {
                setClipEnd(newTime);
              } else {
                handleTimeChange([newTime]);
              }
            }}
          />
        </div>

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
      </div>
    </div>
  );
};

export default VideoPlayer;
