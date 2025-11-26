"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import { SidebarModeToggle } from "@/components/sidebar-mode-toggle";
import { BarChart3, User, FolderOpen, LogOut, HelpCircle } from "lucide-react";
import { logger } from "@/lib/logger";

const getProfileCompletionStatus = () => {
  return {
    personalInfo: false, // Missing basic profile info
    professionalInfo: false, // Missing license/brokerage info
    contactInfo: true, // Contact information completed
  };
};

// ADVERTISING - Run ads pipeline
const advertisingItems = [
  {
    title: "Campaigns",
    href: "/campaigns",
    icon: BarChart3
  },
  {
    title: "Listings",
    href: "/listing-manager",
    icon: FolderOpen
  }
];

// YOU - Personal settings
const youItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: User
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle
  },
  {
    title: "Sign Out",
    href: "#",
    icon: LogOut,
    isSignOut: true
  }
];

export function AppSidebar() {
  const pathname = usePathname();

  const profileCompletion = getProfileCompletionStatus();
  const profileCompletedSections = Object.values(profileCompletion).filter(Boolean).length;
  const profileTotalSections = Object.keys(profileCompletion).length;
  const profileHasPendingIssues = profileCompletedSections < profileTotalSections;


  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-0">
        <div className="flex h-14 items-center justify-center group-data-[collapsible=icon]:justify-center px-4 group-data-[collapsible=icon]:px-0">
          <Logo />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {advertisingItems.map(item => {
                const Icon = item.icon;
                const isActive = pathname === item.href ||
                  (item.href === "/campaigns" && pathname === "/dashboard");

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.href}>
                        <div className="relative">
                          <Icon size={16} />
                        </div>
                        <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {youItems.map(item => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const isProfile = item.href === "/profile";
                const showIndicator = isProfile && profileHasPendingIssues;
                const isSignOut = 'isSignOut' in item && item.isSignOut;

                const handleSignOut = () => {
                  // TODO: Implement sign out logic
                  logger.log("Sign out clicked");
                };

                if (isSignOut) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={handleSignOut} tooltip={item.title} className="text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                        <Icon size={16} />
                        <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.href}>
                        <div className="relative">
                          <Icon size={16} />
                          {showIndicator && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                          )}
                        </div>
                        <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}