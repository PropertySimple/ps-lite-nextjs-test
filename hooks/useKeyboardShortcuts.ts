import { useEffect } from "react";

interface ShortcutHandlers {
  onCall?: () => void;
  onText?: () => void;
  onEmail?: () => void;
  onHelp?: () => void;
}

/**
 * Hook for keyboard shortcuts
 * C = Call, T = Text, E = Email, ? = Help
 */
export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      switch (key) {
        case "c":
          handlers.onCall?.();
          break;
        case "t":
          handlers.onText?.();
          break;
        case "e":
          handlers.onEmail?.();
          break;
        case "?":
          handlers.onHelp?.();
          break;
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [handlers]);
}
