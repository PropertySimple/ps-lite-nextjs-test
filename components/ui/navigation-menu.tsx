import * as React from "react"
import { cn } from "@/lib/utils"

// NOTE: @radix-ui/react-navigation-menu stub

const NavigationMenu = ({ children, ...props }: any) => <div {...props}>{children}</div>
const NavigationMenuList = ({ children, ...props }: any) => <div {...props}>{children}</div>
const NavigationMenuItem = ({ children, ...props }: any) => <div {...props}>{children}</div>
const NavigationMenuLink = ({ children, ...props }: any) => <a {...props}>{children}</a>
const NavigationMenuContent = ({ children, ...props }: any) => <div {...props}>{children}</div>
const NavigationMenuTrigger = ({ children, ...props }: any) => <button {...props}>{children}</button>
const NavigationMenuViewport = ({ ...props }: any) => <div {...props} />

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuViewport,
}
