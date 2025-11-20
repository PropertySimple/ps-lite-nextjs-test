import { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
  platform?: 'instagram' | 'facebook';
}

export function PhoneMockup({ children, platform = 'instagram' }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto" style={{ width: '320px' }}>
      {/* iPhone Frame */}
      <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10"></div>

        {/* Screen */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden relative" style={{ height: '650px' }}>
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 text-xs font-semibold z-20 bg-white">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.5 2A1.5 1.5 0 007 3.5v13A1.5 1.5 0 008.5 18h3a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0011.5 2h-3z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="h-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
