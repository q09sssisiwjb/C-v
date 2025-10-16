import { useEffect, useRef, useState } from 'react';

export default function Upscale() {
  const mobileAdRef = useRef<HTMLDivElement>(null);
  const desktopAdRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && mobileAdRef.current && !mobileAdRef.current.querySelector('script')) {
      // @ts-ignore
      window.atOptions = {
        'key': '3c88c0c6c156a411837976445c9a1161',
        'format': 'iframe',
        'height': 50,
        'width': 320,
        'params': {}
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/3c88c0c6c156a411837976445c9a1161/invoke.js';
      mobileAdRef.current.appendChild(script);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile && desktopAdRef.current && !desktopAdRef.current.querySelector('script')) {
      // @ts-ignore
      window.atOptions = {
        'key': 'cf9ec9f0f430d82891ce3c4c34f3503c',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/cf9ec9f0f430d82891ce3c4c34f3503c/invoke.js';
      desktopAdRef.current.appendChild(script);
    }
  }, [isMobile]);

  return (
    <div className="w-full h-screen flex flex-col">
      {isMobile ? (
        <div 
          ref={mobileAdRef}
          className="w-full flex justify-center items-center bg-gray-100 dark:bg-gray-900 py-2"
          style={{ minHeight: '50px' }}
          data-testid="adsterra-banner-mobile"
        />
      ) : (
        <div 
          ref={desktopAdRef}
          className="w-full flex justify-center items-center bg-gray-100 dark:bg-gray-900 py-2"
          style={{ minHeight: '90px' }}
          data-testid="adsterra-banner-desktop"
        />
      )}
      <iframe
        src="https://wiuhh-photoupscalerpro.static.hf.space"
        className="w-full flex-1 border-0"
        title="Photo Upscaler Pro"
        data-testid="upscaler-iframe"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
