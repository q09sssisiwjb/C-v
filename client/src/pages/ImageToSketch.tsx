import { useEffect, useRef } from 'react';

const AdsterraBanner = () => {
  const mobileAdRef = useRef<HTMLDivElement>(null);
  const desktopAdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMobileAd = () => {
      if (mobileAdRef.current && window.innerWidth < 768) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
          atOptions = {
            'key' : 'cb0fcd15f1cc600221094578455852a9',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        `;
        mobileAdRef.current.appendChild(script);

        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = '//www.highperformanceformat.com/cb0fcd15f1cc600221094578455852a9/invoke.js';
        mobileAdRef.current.appendChild(invokeScript);
      }
    };

    const loadDesktopAd = () => {
      if (desktopAdRef.current && window.innerWidth >= 768) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
          atOptions = {
            'key' : '4f719b8be7c355f105aad5d9ecc3ad4a',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `;
        desktopAdRef.current.appendChild(script);

        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = '//www.highperformanceformat.com/4f719b8be7c355f105aad5d9ecc3ad4a/invoke.js';
        desktopAdRef.current.appendChild(invokeScript);
      }
    };

    loadMobileAd();
    loadDesktopAd();
  }, []);

  return (
    <div className="flex justify-center items-center py-2 bg-background">
      <div ref={mobileAdRef} className="block md:hidden" data-testid="ad-mobile-banner"></div>
      <div ref={desktopAdRef} className="hidden md:block" data-testid="ad-desktop-banner"></div>
    </div>
  );
};

const ImageToSketch = () => {
  return (
    <div className="h-full w-full flex flex-col" style={{ margin: 0, padding: 0, border: "none", outline: "none" }}>
      <AdsterraBanner />
      <div className="flex-1" style={{ margin: 0, padding: 0 }}>
        <iframe
          src="https://wiuhh-sketch-ai.hf.space"
          width="100%"
          height="100%"
          title="Image to Sketch Tool"
          style={{ 
            border: "none", 
            margin: 0, 
            padding: 0, 
            display: "block",
            outline: "none",
            borderRadius: 0,
            boxShadow: "none"
          }}
          data-testid="iframe-image-to-sketch"
        />
      </div>
    </div>
  );
};

export default ImageToSketch;
