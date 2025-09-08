import { Home, PlayCircle, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link, NavLink } from "react-router-dom"

// Menu items
const items = [
  { title: "Home", url: "/explore", icon: Home },
  { title: "Search", url: "/search", icon: Search },
]

export default function AppSidebar() {
  const { open } = useSidebar() // true if expanded, false if collapsed

  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo Section */}
        <SidebarGroup>
          <SidebarGroupLabel className={"p-8"}>
            <Link to={"/"} className="flex items-center gap-2 px-4 py-8">
              {/* Logo Icon */}
              <PlayCircle className="w-6 h-6 text-blue-500" />

              {/* Show text only when expanded */}
              {open && (
                <span className="text-xl font-bold tracking-wide">
                  ClipZen
                </span>
              )}
            </Link>
          </SidebarGroupLabel>

          {/* Menu Section */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 
                        ${isActive
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
                  onClick={() => alert("Settings clicked!")}
                >
                  <Settings className="w-5 h-5" />
                  {open && <span>Settings</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
