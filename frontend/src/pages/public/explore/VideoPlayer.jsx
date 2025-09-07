import { Heart, MessageSquare, Share2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const videos = [
  { id: 1, src: "/Video1.mp4", caption: "Clip 1", likes: 120, comments: 45, shares: 12 },
  { id: 2, src: "/Video2.mp4", caption: "Clip 2", likes: 89, comments: 30, shares: 7 },
  { id: 3, src: "/Video3.mp4", caption: "Clip 3", likes: 200, comments: 90, shares: 25 },
];

const VideoPlayer = () => {
  const videoRefs = useRef([]);
  const [videoOrientations, setVideoOrientations] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.currentTime = 0; // restart from beginning
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  const handleLoadedMetadata = (index, e) => {
    const video = e.target;
    const isLandscape = video.videoWidth > video.videoHeight;
    setVideoOrientations((prev) => ({
      ...prev,
      [index]: isLandscape ? "landscape" : "portrait",
    }));
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      {/* Scrollable video feed */}
      <div className="h-full w-full md:w-[380px] md:h-[600px] bg-black rounded-2xl overflow-y-scroll snap-y snap-mandatory shadow-lg no-scrollbar">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="h-full w-full flex items-center justify-center snap-start relative cursor-pointer"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              className={`rounded-2xl ${videoOrientations[index] === "landscape"
                ? "w-full h-auto object-contain"
                : "h-full w-full object-cover"
                }`}
              loop
              muted
              playsInline
              onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
            />

            {/* Overlay: caption */}
            <div className="absolute bottom-16 left-4 text-white">
              <p className="text-lg font-semibold">{video.caption}</p>
            </div>

            {/* Overlay: actions with counts */}
            <div className="absolute bottom-16 right-4 flex flex-col gap-4 items-center text-white">
              <div className="flex flex-col items-center">
                <button className="p-2 bg-white/20 rounded-full">
                  <Heart size={16} />
                </button>
                <span className="text-sm">{video.likes}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="p-2 bg-white/20 rounded-full">
                  <MessageSquare size={16} />
                </button>
                <span className="text-sm">{video.comments}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="p-2 bg-white/20 rounded-full">
                  <Share2 size={16} />
                </button>
                <span className="text-sm">{video.shares}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
