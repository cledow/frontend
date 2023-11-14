import { useRef, useEffect } from "react";

interface RTCVideoProps {
  mediaStream: MediaStream | undefined;
}

const Video = ({ mediaStream }: RTCVideoProps) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!viewRef.current)
        return;
    viewRef.current.srcObject = mediaStream ? mediaStream : null;
  }, [mediaStream]);

  return <video ref={viewRef} autoPlay playsInline></video>;
};

export default Video;