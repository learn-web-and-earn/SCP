import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import ThemeSwitcher from "@/components/custom/ThemeSwitcher";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { logout } from "@/store/authSlice"; // 👈 adjust if your slice exports logout

export default function Layout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Helper: first 2 letters
  const getInitials = (name) => {
    if (!name) return "";
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logout()); // clear redux state
    navigate("/login"); // redirect
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
          {children}

          {/* Top Right User/Theme Section */}
          <div className="hidden absolute top-4 right-4 lg:flex items-center gap-4">
            <ThemeSwitcher />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <Avatar>
                      {user.Avatar ? (
                        <AvatarImage src={user.Avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      )}
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
                >
                  <DropdownMenuItem
                    onClick={() => navigate(`/profile/${user.userId}`)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <UserIcon size={16} />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
