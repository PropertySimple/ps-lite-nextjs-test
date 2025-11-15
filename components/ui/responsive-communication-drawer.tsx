import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface ResponsiveDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: string;
  children: React.ReactNode;
}

export function ResponsiveCommunicationDrawer({
  open,
  onOpenChange,
  title,
  description,
  type: _type,
  children,
}: ResponsiveDrawerProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description ? (
            <DrawerDescription>{description}</DrawerDescription>
          ) : (
            <DrawerDescription className="sr-only">
              {title.toLowerCase()}
            </DrawerDescription>
          )}
        </DrawerHeader>
          <div className="px-4 pb-4">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : (
            <DialogDescription className="sr-only">
              Dialog for {title.toLowerCase()}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="space-y-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}