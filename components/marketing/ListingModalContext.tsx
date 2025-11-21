"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ListingUrlModal } from "./ListingUrlModal";

interface ListingModalContextType {
  openModal: () => void;
}

const ListingModalContext = createContext<ListingModalContextType | undefined>(undefined);

export function useListingModal() {
  const context = useContext(ListingModalContext);
  if (!context) {
    throw new Error("useListingModal must be used within a ListingModalProvider");
  }
  return context;
}

export function ListingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <ListingModalContext.Provider value={{ openModal }}>
      {children}
      <ListingUrlModal open={isOpen} onOpenChange={setIsOpen} />
    </ListingModalContext.Provider>
  );
}
