"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import { SidebarModeToggle } from "@/components/sidebar-mode-toggle";
import { BarChart3, Users, User, MessageSquare, FolderOpen, LogOut } from "lucide-react";
import { AssistantAvatar } from "@/components/AssistantAvatar";
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

// LEADS - Handle leads pipeline
const leadsItems = [
  {
    title: "Inbox",
    href: "/inbox",
    icon: MessageSquare,
    badge: 4 // Number of items needing attention
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: Users
  },
  {
    title: "Sarah", // TODO: Make dynamic based on selected rep
    href: "/ai-automation",
    icon: null, // Will use AssistantAvatar instead
    isAssistant: true
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
        {/* ADVERTISING Section */}
        <SidebarGroup>
          <SidebarGroupLabel>ADVERTISING</SidebarGroupLabel>
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

        {/* LEADS Section */}
        <SidebarGroup>
          <SidebarGroupLabel>LEADS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {leadsItems.map(item => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const showBadge = item.badge && item.badge > 0;
                const isAssistant = item.isAssistant;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.href}>
                        <div className="relative">
                          {isAssistant ? (
                            <AssistantAvatar rep="sarah" size="sm" className="h-4 w-4" />
                          ) : Icon ? (
                            <>
                              <Icon size={16} />
                              {showBadge && (
                                <div className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                  {item.badge}
                                </div>
                              )}
                            </>
                          ) : null}
                        </div>
                        <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                        {showBadge && (
                          <span className="ml-auto text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-950 px-2 py-0.5 rounded-full group-data-[collapsible=icon]:hidden">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* YOU Section */}
        <SidebarGroup>
          <SidebarGroupLabel>YOU</SidebarGroupLabel>
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