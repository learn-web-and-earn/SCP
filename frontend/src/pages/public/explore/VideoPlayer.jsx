import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setLoading } from "@/store/authSlice";
import { setMuted, setVideos } from "@/store/video.store";
import {
  Heart,
  MessageSquare,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VideoPlayer = () => {
  const videoRefs = useRef([]);
  const videos = useSelector((state) => state.video.videos); // ✅ guard
  const isMuted = useSelector((state) => state.video.isMuted);
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();
  const [videoOrientations, setVideoOrientations] = useState({});

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      dispatch(setLoading(true));
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/item/getAll`);
        const data = await res.json();
        dispatch(setVideos(data.items || []));
      } catch (error) {
        console.error("Error fetching videos:", error);
        dispatch(setVideos([])); // ✅ ensure safe fallback
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchVideos();
  }, [dispatch]);

  // Play/Pause based on intersection
  useEffect(() => {
    if (videos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.currentTime = 0;
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    const currentVideos = videoRefs.current;
    currentVideos.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      currentVideos.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  // Sync Redux mute state with DOM video elements
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.muted = isMuted;
    });
  }, [isMuted]);

  const handleLoadedMetadata = (index, e) => {
    const video = e.target;
    const isLandscape = video.videoWidth > video.videoHeight;
    setVideoOrientations((prev) => ({
      ...prev,
      [index]: isLandscape ? "landscape" : "portrait",
    }));
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100 dark:bg-gray-900 relative">

      {/* Scrollable video feed */}
      <div className="h-full w-full md:w-[380px] md:h-[600px] bg-black rounded-2xl overflow-y-scroll snap-y snap-mandatory shadow-lg no-scrollbar">
        {(videos || []).map((video, index) => (
          <div
            key={video._id || index}
            className="h-full w-full flex items-center justify-center snap-start relative cursor-pointer"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.video}
              className={`rounded-2xl ${videoOrientations[index] === "landscape"
                ? "w-full h-auto object-contain"
                : "h-full w-full object-cover"
                }`}
              loop
              muted={isMuted}
              playsInline
              onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
            />

            {/* Overlay: caption */}
            <Link to={`/profile/${video.User._id}`} className="absolute bottom-16 left-4 text-white flex items-center gap-2">
              <Avatar>
                <AvatarImage src={video.User.avatar} />
                <AvatarFallback>{video.User.name[0]}</AvatarFallback>
              </Avatar>
              <p className="text-lg font-semibold">{video.User.name}</p>
            </Link>

            {/* Overlay: actions */}
            <div className="absolute bottom-16 right-4 flex flex-col gap-4 items-center text-white">
              <div className="flex flex-col items-center">
                <button className="p-2 bg-white/20 rounded-full">
                  <Heart size={16} />
                </button>
                <span className="text-sm">{video.likes || 0}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="p-2 bg-white/20 rounded-full">
                  <MessageSquare size={16} />
                </button>
                <span className="text-sm">{video.comments || 0}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="p-2 bg-white/20 rounded-full">
                  <Share2 size={16} />
                </button>
                <span className="text-sm">{video.shares || 0}</span>
              </div>
            </div>

            {/* Global mute/unmute button */}
            <button
              onClick={() => dispatch(setMuted())}
              className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white"
            >
              {isMuted ? (
                <VolumeX size={20} className="cursor-pointer" />
              ) : (
                <Volume2 size={20} className="cursor-pointer" />
              )}
            </button>
          </div>
        ))}

        {videos.length === 0 && !loading && (
          <p className="text-center text-gray-400 mt-10">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
