"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LoginModal } from "./LoginModal";

interface LoginModalContextType {
  openLoginModal: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export function useLoginModal() {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }
  return context;
}

export function LoginModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openLoginModal = () => setIsOpen(true);

  return (
    <LoginModalContext.Provider value={{ openLoginModal }}>
      {children}
      <LoginModal open={isOpen} onOpenChange={setIsOpen} />
    </LoginModalContext.Provider>
  );
}
