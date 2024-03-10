import Script from 'next/script';
import { useEffect, useRef } from 'react';

const VideoPlayer = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.fluidplayer.com/v3/current/fluidplayer.min.js";
    script.async = true; // Ensure script loads asynchronously
    document.body.appendChild(script);

    script.onload = () => {
      // fluidPlayer is now defined after the script loads
      fluidPlayer('my-video', {
        vastOptions: {
          adList: [{
            vAlign: "bottom",
            roll: "preRoll",
            vastTag: "https://s.magsrv.com/splash.php?idzone=5237332"
          }]
        }
      });
    };

    return () => {
      // Cleanup function (optional)
    };
  }, []);

  return (
    <div>
      <Script src="https://cdn.fluidplayer.com/v3/current/fluidplayer.min.js"></Script>  {/* Can be removed if using useEffect */}
      <video id="my-video" ref={playerRef} controls="" style={{width: 640, height: 360 }}>
        <source src="main_video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
