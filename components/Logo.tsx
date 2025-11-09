import Image from "next/image";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Full logo - shown when sidebar is expanded */}
      <div className="group-data-[collapsible=icon]:hidden">
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
      </div>

      {/* Icon logo - shown when sidebar is collapsed */}
      <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center">
        <Building2 className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Logo;