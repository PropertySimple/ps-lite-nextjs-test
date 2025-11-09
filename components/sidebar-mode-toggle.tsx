import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function SidebarModeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    // Toggle between light and dark only
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    // Show sun for light mode, moon for dark/system
    if (theme === "light") {
      return <Sun className="h-5 w-5" />
    } else {
      return <Moon className="h-5 w-5" />
    }
  }

  const getLabel = () => {
    if (theme === "light") return "Light"
    return "Dark"
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      className="w-full justify-start gap-3 px-2 h-9"
    >
      {getIcon()}
      <span className="group-data-[collapsible=icon]:hidden">{getLabel()}</span>
    </Button>
  )
}
