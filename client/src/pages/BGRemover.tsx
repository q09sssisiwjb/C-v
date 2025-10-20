import { useEffect, useRef } from "react";

const AdBanner = () => {
  const mobileAdRef = useRef<HTMLDivElement>(null);
  const desktopAdRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://www.highperformanceformat.com';
    document.head.appendChild(preconnect);

    const isMobile = window.innerWidth < 768;

    if (isMobile && mobileAdRef.current) {
      const mobileScript = document.createElement('script');
      mobileScript.type = 'text/javascript';
      mobileScript.async = true;
      mobileScript.innerHTML = `
        atOptions = {
          'key' : 'cb0fcd15f1cc600221094578455852a9',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      
      const mobileInvokeScript = document.createElement('script');
      mobileInvokeScript.type = 'text/javascript';
      mobileInvokeScript.async = true;
      mobileInvokeScript.src = '//www.highperformanceformat.com/cb0fcd15f1cc600221094578455852a9/invoke.js';
      
      mobileAdRef.current.appendChild(mobileScript);
      mobileAdRef.current.appendChild(mobileInvokeScript);
    } else if (!isMobile && desktopAdRef.current) {
      const desktopScript = document.createElement('script');
      desktopScript.type = 'text/javascript';
      desktopScript.async = true;
      desktopScript.innerHTML = `
        atOptions = {
          'key' : '4f719b8be7c355f105aad5d9ecc3ad4a',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      
      const desktopInvokeScript = document.createElement('script');
      desktopInvokeScript.type = 'text/javascript';
      desktopInvokeScript.async = true;
      desktopInvokeScript.src = '//www.highperformanceformat.com/4f719b8be7c355f105aad5d9ecc3ad4a/invoke.js';
      
      desktopAdRef.current.appendChild(desktopScript);
      desktopAdRef.current.appendChild(desktopInvokeScript);
    }
  }, []);

  return (
    <div className="w-full flex justify-center py-2 bg-background" data-testid="ad-banner-bg-remover">
      <div ref={mobileAdRef} className="block md:hidden" data-testid="ad-mobile"></div>
      <div ref={desktopAdRef} className="hidden md:block" data-testid="ad-desktop"></div>
    </div>
  );
};

const BGRemover = () => {
  return (
    <div className="h-full w-full flex flex-col" style={{ margin: 0, padding: 0, border: "none", outline: "none" }}>
      <AdBanner />
      <div className="flex-1" style={{ margin: 0, padding: 0 }}>
        <iframe
          src="https://wiuhh-new-bg.hf.space"
          width="100%"
          height="100%"
          title="Background Remover Tool"
          style={{ border: "none", margin: 0, padding: 0, display: "block" }}
        />
      </div>
    </div>
  );
};

export default BGRemover;
