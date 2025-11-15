declare module 'react-facebook-pixel' {
  interface PixelOptions {
    autoConfig?: boolean;
    debug?: boolean;
  }

  interface EventData {
    content_type?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  interface ReactPixel {
    init(pixelId: string, advancedMatching?: object, options?: PixelOptions): void;
    pageView(): void;
    track(event: string, data?: EventData): void;
    trackCustom(event: string, data?: EventData): void;
    trackSingle(pixelId: string, event: string, data?: EventData): void;
    trackSingleCustom(pixelId: string, event: string, data?: EventData): void;
    grantConsent(): void;
    revokeConsent(): void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq(...args: any[]): void;
  }

  const ReactPixel: ReactPixel;
  export default ReactPixel;
}
