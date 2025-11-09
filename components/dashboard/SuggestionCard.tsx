"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Lightbulb } from "lucide-react";

const SuggestionCard = () => {
  const router = useRouter();

  const handleRunAd = () => {
    toast({
      title: "Success!",
      description: "Starting ad creation for this property",
    });
    router.push("/");
  };

  return (
    <Card className="mb-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          {/* Icon + Property Image */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-lg overflow-hidden shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=80&h=80&fit=crop"
                alt="Property"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Property Details and Suggestion */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base mb-1">Suggested Ad Opportunity - Open House</h3>
            <p className="text-xs sm:text-sm font-medium text-foreground mb-1">
              123 Main St, Seattle, WA 98101
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Open house this weekend - consider running an ad to drive more traffic to your listing.
            </p>
          </div>

          {/* Run Ad Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <Button onClick={handleRunAd} size="sm" className="w-full sm:w-auto">
              Run Ad
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestionCard;
