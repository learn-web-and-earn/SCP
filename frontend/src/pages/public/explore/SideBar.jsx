import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import ThemeSwitcher from "@/components/custom/ThemeSwitcher";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout({ children }) {
  const user = useSelector((state) => state.auth.user);

  // Helper: first 2 letters
  const getInitials = (name) => {
    if (!name) return "";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full relative">
        {/* Sidebar */}
        <div className="hidden md:block w-64 border-r border-gray-200 dark:border-gray-800">
          <AppSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex justify-center items-center relative">
          {/* Absolute Sidebar Trigger (only on mobile) */}
          <div className="absolute top-4 left-4 md:hidden z-50">
            <SidebarTrigger className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md" />
          </div>

          {children}

          {/* Top Right User/Theme Section */}
          <div className="absolute top-4 right-4 flex items-center gap-4">
            <ThemeSwitcher />
            {user ? (
              <div className="flex items-center gap-2">
                <Avatar>
                  {user.Avatar ? (
                    <AvatarImage src={user.Avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  )}
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
