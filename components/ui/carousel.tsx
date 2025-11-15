"use client";

// NOTE: embla-carousel-react is not installed
// This component is stubbed out as it is not currently used in the app

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
opts?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins?: any
  orientation?: "horizontal" | "vertical"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  setApi?: (api: any) => void
};

const CarouselContext = React.createContext<any>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins: _plugins,
      className: _className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef] = [React.useRef(null)];
    const [api, setApiInternal] = React.useState<any>(null);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev?.();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext?.();
    }, [api]);

    const handleSelect = React.useCallback(() => {
      if (api) {
        setCanScrollPrev(api.canScrollPrev?.() ?? false);
        setCanScrollNext(api.canScrollNext?.() ?? false);
      }
    }, [api]);

    React.useEffect(() => {
      if (!api) return;

      handleSelect();
      api.on?.("reInit", handleSelect);
      api.on?.("select", handleSelect);

      return () => {
        api?.off?.("select", handleSelect);
      };
    }, [api, handleSelect]);

    React.useEffect(() => {
      setApi?.(api);
    }, [api, setApi]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          className={cn("relative", className)}
          role="region"
          aria-label="Carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    aria-label="slide"
    className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className="absolute left-12 top-1/2 z-40 -translate-y-1/2"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className="absolute right-12 top-1/2 z-40 -translate-y-1/2"
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselProps,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
};
