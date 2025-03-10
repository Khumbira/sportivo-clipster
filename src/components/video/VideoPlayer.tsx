
import React from 'react';
import { Video } from '@/types';
import Timeline from './timeline/Timeline';
import VideoControls from './controls/VideoControls';
import ClipActions from './clip/ClipActions';
import { useVideoPlayer } from './hooks/useVideoPlayer';

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const {
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
  } = useVideoPlayer(`/demo-video.mp4`, video.format, video.thumbnailUrl);

  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-black relative">
      {isClipping && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-primary/80 text-white p-2 text-sm flex justify-between items-center">
          <span>Creating clip: {formatDuration(clipStart)} to {formatDuration(clipEnd)}. 
          Use the timeline to set the end point.</span>
          <button 
            onClick={cancelClipping}
            className="text-white hover:text-white/80 ml-2 px-2 py-1 rounded-md bg-black/20 hover:bg-black/40 text-xs"
          >
            Cancel
          </button>
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
        {clipCreated && (
          <ClipActions 
            clipStart={clipStart}
            clipEnd={clipEnd}
            onDownload={handleDownload}
            onAddToLibrary={addToLibrary}
            onPreview={previewClip}
            onDiscard={discardClip}
          />
        )}
        
        <Timeline 
          currentTime={currentTime}
          duration={duration}
          thumbnails={thumbnails}
          zoomLevel={zoomLevel}
          increaseZoom={increaseZoom}
          decreaseZoom={decreaseZoom}
          isClipping={isClipping}
          clipStart={clipStart}
          clipEnd={clipEnd}
          onTimelineClick={handleTimeChange}
          onClipEndChange={handleClipEndChange}
        />

        <VideoControls 
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          isClipping={isClipping}
          togglePlay={togglePlay}
          handleSkipBack={handleSkipBack}
          handleSkipForward={handleSkipForward}
          toggleMute={toggleMute}
          handleVolumeChange={handleVolumeChange}
          startClipping={startClipping}
          handleDownload={handleDownload}
        />
      </div>
    </div>
  );
};

// Import formatDuration at the top of the file
import { formatDuration } from '@/utils/mockData';

export default VideoPlayer;
