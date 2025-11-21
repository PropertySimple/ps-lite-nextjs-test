"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLoginModal } from "@/components/marketing/LoginModalContext";

export function MarketingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openLoginModal } = useLoginModal();

  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Light mode logo */}
            <Image
              alt="PropertySimple"
              className="h-8 w-auto block dark:hidden"
              src="/lovable-uploads/3ae8586b-2625-423a-8e97-0bae1a52dd43.png"
              width={200}
              height={32}
            />
            {/* Dark mode logo */}
            <Image
              alt="PropertySimple"
              className="h-8 w-auto hidden dark:block"
              src="/lovable-uploads/057a76e0-bc0c-4ad8-90e5-6096e23fbed7.png"
              width={200}
              height={32}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/examples" className="text-sm font-medium hover:text-primary transition-colors">
              Examples
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              onClick={openLoginModal}
            >
              Client Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 space-y-4 border-t"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <Link
              href="/pricing"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/how-it-works"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/examples"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Examples
            </Link>
            <Link
              href="/about"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 space-y-2">
              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => {
                  openLoginModal();
                  setMobileMenuOpen(false);
                }}
              >
                Client Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
