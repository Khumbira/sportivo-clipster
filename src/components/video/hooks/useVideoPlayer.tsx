
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { formatDuration } from '@/utils/mockData';

export const useVideoPlayer = (videoUrl: string, format: string, thumbnailUrl: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [clipStart, setClipStart] = useState(0);
  const [clipEnd, setClipEnd] = useState(0);
  const [isClipping, setIsClipping] = useState(false);
  const [clipCreated, setClipCreated] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  useEffect(() => {
    if (duration > 0) {
      const thumbs = [];
      const numThumbs = Math.ceil(duration / 10);
      for (let i = 0; i < numThumbs; i++) {
        thumbs.push(thumbnailUrl);
      }
      setThumbnails(thumbs);
    }
  }, [duration, thumbnailUrl]);

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

  const handleTimeChange = (newTime: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
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
      
      // Create the clip
      setClipCreated(true);
      setIsClipping(false);
      toast.success(`Clip created from ${formatDuration(clipStart)} to ${formatDuration(clipEnd)}`);
    } else {
      setClipStart(currentTime);
      setClipEnd(Math.min(currentTime + 30, duration));
      setIsClipping(true);
      toast.info("Select clip end point on the timeline");
    }
  };

  const cancelClipping = () => {
    setIsClipping(false);
    toast.info("Clip creation cancelled");
  };

  const handleDownload = () => {
    if (clipCreated) {
      toast.success(`Downloading clip from ${formatDuration(clipStart)} to ${formatDuration(clipEnd)}`);
    } else {
      toast.success(`Downloading full video`);
    }
  };

  const addToLibrary = () => {
    toast.success(`Clip added to your library`);
  };

  const discardClip = () => {
    setClipCreated(false);
    toast.info("Clip discarded");
  };

  const previewClip = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = clipStart;
    setCurrentTime(clipStart);
    setIsPlaying(true);
    video.play();
    
    // Stop playback when clip ends
    const clipEndTimeout = setTimeout(() => {
      video.pause();
      setIsPlaying(false);
    }, (clipEnd - clipStart) * 1000);
    
    return () => clearTimeout(clipEndTimeout);
  };

  const increaseZoom = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };

  const decreaseZoom = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  const handleClipEndChange = (newTime: number) => {
    setClipEnd(newTime);
  };

  return {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    clipStart,
    clipEnd,
    isClipping,
    clipCreated,
    zoomLevel,
    thumbnails,
    videoUrl,
    format,
    togglePlay,
    handleTimeChange,
    toggleMute,
    handleVolumeChange,
    handleSkipBack,
    handleSkipForward,
    startClipping,
    cancelClipping,
    handleDownload,
    addToLibrary,
    discardClip,
    previewClip,
    increaseZoom,
    decreaseZoom,
    handleClipEndChange
  };
};
