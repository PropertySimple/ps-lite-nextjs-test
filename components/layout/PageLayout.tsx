"use client";


import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ReactNode, useState } from "react";
import { AssistantAvatar } from "@/components/AssistantAvatar";
import { ChatWithAssistant } from "@/components/ChatWithAssistant";
import { Button } from "@/components/ui/button";

interface PageLayoutProps {
  children: ReactNode;
  headerActions?: ReactNode;
  pageContext?: string; // For context-aware chat
}

/**
 * Main layout component that provides the sidebar, header, and content area
 * Used across all main application pages
 */
const PageLayout = ({ children, headerActions, pageContext }: PageLayoutProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  // TODO: Get selected rep from global state/context
  const selectedRep = "sarah";
  const selectedRepName = "Sarah";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-3 px-4 lg:px-6 w-full">
            <SidebarTrigger className="-ml-1 min-w-[44px] min-h-[44px]" aria-label="Toggle sidebar" />
            <div className="flex-1 min-w-0" />
            {headerActions && (
              <div className="flex items-center gap-2">
                {headerActions}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen(true)}
              className="shrink-0"
              aria-label="Chat with assistant"
            >
              <AssistantAvatar rep={selectedRep} size="sm" pulse={false} />
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-8 pt-0">
          <div className="max-w-screen-2xl mx-auto w-full py-6 lg:py-8">
            {children}
          </div>
        </div>
      </SidebarInset>

      <ChatWithAssistant
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        rep={selectedRep}
        repName={selectedRepName}
        context={pageContext}
      />
    </SidebarProvider>
  );
};

export default PageLayout;
