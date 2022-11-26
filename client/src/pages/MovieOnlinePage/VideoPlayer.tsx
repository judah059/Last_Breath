import React from 'react';
import ReactPlayer from "react-player";

interface VideoPlayerProps {
    videoUrl: string
}


const VideoPlayer: React.FC<VideoPlayerProps> = ({videoUrl}) => {
    return (
        <ReactPlayer url={videoUrl} controls/>
    );
};

export default VideoPlayer;