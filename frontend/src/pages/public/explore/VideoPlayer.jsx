import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setLoading } from "@/store/authSlice";
import { setMuted, setVideos } from "@/store/video.store";
import {
  Heart,
  MessageSquare,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Menu,
  RefreshCw,
  Download,
} from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VideoNav from "./VideoNav";

const VideoPlayer = () => {
  const videoRefs = useRef([]);
  const videos = useSelector((state) => state.video.videos);
  const isMuted = useSelector((state) => state.video.isMuted);
  const loading = useSelector((state) => state.auth.loading);


  const dispatch = useDispatch();
  const [videoOrientations, setVideoOrientations] = useState({});
  const [progress, setProgress] = useState({});
  const [pausedVideos, setPausedVideos] = useState({});
  const [autoScroll, setAutoScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ✅ Reusable fetch function
  const fetchVideos = useCallback(async () => {
    setRefreshing(true);
    dispatch(setLoading(true));
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/item/getAll`);
      const data = await res.json();
      dispatch(setVideos(data.items || []));

      // ✅ After videos are set, reset scroll & play first video
      setTimeout(() => {
        const container = document.querySelector(".video-feed");
        if (container) container.scrollTo({ top: 0, behavior: "instant" });

        if (videoRefs.current[0]) {
          videoRefs.current[0].currentTime = 0;
          videoRefs.current[0].play().catch(() => { });
        }
      }, 300);
    } catch (error) {
      console.error("Error fetching videos:", error);
      dispatch(setVideos([]));
    } finally {
      dispatch(setLoading(false));
      setTimeout(() => setRefreshing(false), 800);
    }
  }, [dispatch]);


  // Initial load
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Intersection observer: play/pause videos
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

  // Sync mute state
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.muted = isMuted;
    });
  }, [isMuted]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-container")) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  const handleLoadedMetadata = (index, e) => {
    const video = e.target;
    const isLandscape = video.videoWidth > video.videoHeight;
    setVideoOrientations((prev) => ({
      ...prev,
      [index]: isLandscape ? "landscape" : "portrait",
    }));
  };

  const handleTimeUpdate = (index, e) => {
    const video = e.target;
    const percent = (video.currentTime / video.duration) * 100;
    setProgress((prev) => ({ ...prev, [index]: percent }));
  };

  const handleSeek = (index, e) => {
    const newTime =
      (e.target.value / 100) * videoRefs.current[index].duration;
    videoRefs.current[index].currentTime = newTime;
    setProgress((prev) => ({ ...prev, [index]: e.target.value }));
  };

  const handlePlay = (index) => {
    setPausedVideos((prev) => ({ ...prev, [index]: false }));
  };

  const handlePause = (index) => {
    setPausedVideos((prev) => ({ ...prev, [index]: true }));
  };

  // ✅ Auto scroll feature
  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      const container = document.querySelector(".video-feed");
      if (!container) return;

      const current = Array.from(videoRefs.current).find((video) => {
        const rect = video.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2;
      });

      if (current) {
        const next = current.parentElement.nextSibling;
        if (next) {
          next.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  const handleDownloadCurrentVideo = () => {
    const currentVideo = videoRefs.current.find((video) => {
      const rect = video.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight / 2;
    });

    if (currentVideo) {
      const link = document.createElement("a");
      link.href = currentVideo.src;
      link.download = "video.mp4";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  // ✅ Auto-refresh when last video ends
  const handleVideoEnded = (index) => {
    if (index === videos.length - 1) {
      fetchVideos();
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100 dark:bg-gray-900 relative">
      {/* Spinner on top */}
      {refreshing && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white z-50">
          <RefreshCw className="animate-spin" size={20} />
          <span className="text-sm">Refreshing...</span>
        </div>
      )}

      {/* Scrollable video feed */}
      <div className="video-feed h-full w-full md:w-[380px] md:h-[600px] bg-black rounded-2xl overflow-y-scroll snap-y snap-mandatory shadow-lg no-scrollbar">
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
              loop={false}
              muted={isMuted}
              playsInline
              onClick={(e) => {
                if (e.target.paused) {
                  e.target.play();
                } else {
                  e.target.pause();
                }
              }}
              onPlay={() => handlePlay(index)}
              onPause={() => handlePause(index)}
              onTimeUpdate={(e) => handleTimeUpdate(index, e)}
              onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
              onEnded={() => handleVideoEnded(index)}
            />

            {/* Progress bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress[index] || 0}
              onChange={(e) => handleSeek(index, e)}
              className="absolute bottom-16 md:bottom-2 left-0 w-full h-1 accent-red-500 cursor-pointer z-50"
            />

            {/* Play overlay when paused */}
            {pausedVideos[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                <button
                  onClick={() => {
                    const video = videoRefs.current[index];
                    if (video) {
                      video.play();
                    }
                  }}
                  className="pointer-events-auto flex items-center justify-center"
                >
                  <Play size={60} className="text-white opacity-90" />
                </button>
              </div>
            )}

            {/* Overlay: caption */}
            <Link
              to={`/profile/${video.User._id}`}
              className="absolute bottom-20 md:bottom-10 left-2 text-white flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={video.User.avatar} />
                  <AvatarFallback>{video.User.name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-lg font-semibold">{video.User.name}</p>
              </div>
              <p className="text-sm opacity-90 max-w-[300px]">@{video.description}</p>
            </Link>

            {/* Overlay: actions */}
            <div className="absolute bottom-20 md:bottom-10 right-4 flex flex-col gap-4 items-center text-white">
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

            {/* Top-right controls (mute + menu) */}
            <div className="absolute top-4 right-4 flex items-center gap-2 menu-container">
              {/* Mute/unmute button */}
              <button
                onClick={() => dispatch(setMuted())}
                className="p-2 bg-black/40 rounded-full text-white"
              >
                {isMuted ? (
                  <VolumeX size={20} className="cursor-pointer" />
                ) : (
                  <Volume2 size={20} className="cursor-pointer" />
                )}
              </button>

              {/* Menu button */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="p-2 bg-black/40 rounded-full text-white cursor-pointer"
                >
                  <Menu size={20} />
                </button>

                {/* Dropdown menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-xl py-2 w-44 z-50">
                    <button
                      onClick={() => {
                        setAutoScroll((prev) => !prev);
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                    >
                      <RefreshCw size={16} />
                      {autoScroll ? "Disable Auto Scroll" : "Enable Auto Scroll"}
                    </button>
                    <button
                      onClick={() => {
                        handleDownloadCurrentVideo();
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                    >
                      <Download size={16} />
                      Download Video
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {videos.length === 0 && !loading && (
          <p className="text-center text-gray-400 mt-10">No videos available</p>
        )}
      </div>

      {/* Bottom Navigation (mobile only) */}
      <VideoNav fetchVideos={fetchVideos} />
    </div>
  );
};

export default VideoPlayer;
