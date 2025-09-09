import React from 'react'
import {
  Home,
  Search,
  Plus,
  User,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const VideoNav = ({ fetchVideos }) => {

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex justify-around items-center py-2 z-50 md:hidden">
        <Link
          to="/explore"
          onClick={(e) => {
            e.preventDefault();
            fetchVideos();
          }}
          className="flex flex-col items-center text-gray-600 dark:text-gray-300"
        >
          <Home size={22} />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/discover"
          className="flex flex-col items-center text-gray-600 dark:text-gray-300"
        >
          <Search size={22} />
          <span className="text-xs">Discover</span>
        </Link>

        <Link
          to="/upload"
          className="flex flex-col items-center text-white bg-red-500 rounded-full p-3 -mt-1 shadow-lg"
        >
          <Plus size={24} />
        </Link>

        <Link
          to="/inbox"
          className="flex flex-col items-center text-gray-600 dark:text-gray-300"
        >
          <MessageSquare size={22} />
          <span className="text-xs">Inbox</span>
        </Link>

        <Link
          to={`/profile/${user ? user.userId : ""}`}
          className="flex flex-col items-center text-gray-600 dark:text-gray-300"
        >
          <User size={22} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  )
}

export default VideoNav