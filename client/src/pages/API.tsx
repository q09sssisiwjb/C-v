import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Code2, Globe, Sparkles } from "lucide-react";

export default function API() {
  const { toast } = useToast();
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const domain = "https://creativista-ai.onrender.com";

  const embedCodes = {
    textToImage: {
      title: "Text-to-Image Generator",
      description: "Embed our AI-powered image generator on your website",
      code: `<iframe 
  src="${domain}/text-to-image" 
  width="100%" 
  height="800" 
  frameborder="0" 
  allowfullscreen
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>`,
    },
    imageToImage: {
      title: "Image-to-Image Transformer",
      description: "Transform images with AI on your site",
      code: `<iframe 
  src="${domain}/image-to-image" 
  width="100%" 
  height="800" 
  frameborder="0" 
  allowfullscreen
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>`,
    },
    bgRemover: {
      title: "Background Remover",
      description: "Add background removal tool to your website",
      code: `<iframe 
  src="${domain}/bg-remover" 
  width="100%" 
  height="800" 
  frameborder="0" 
  allowfullscreen
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>`,
    },
    upscale: {
      title: "Image Upscaler",
      description: "Enhance image quality with AI upscaling",
      code: `<iframe 
  src="${domain}/upscale" 
  width="100%" 
  height="800" 
  frameborder="0" 
  allowfullscreen
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>`,
    },
    imageToSketch: {
      title: "Image-to-Sketch Converter",
      description: "Convert photos to sketches on your website",
      code: `<iframe 
  src="${domain}/image-to-sketch" 
  width="100%" 
  height="800" 
  frameborder="0" 
  allowfullscreen
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>`,
    },
    canvasEditor: {
      title: "Canvas Editor",
      description: "Embed our advanced canvas editing tool",
      code: `<iframe 
  src="${domain}/canvas-editor" 
  width="100%" 
  height="800" 
  frameborder="0" 
  allowfullscreen
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>`,
    },
    fullWidget: {
      title: "Complete CreatiVista AI Widget",
      description: "Embed the complete AI toolkit with all features",
      code: `<iframe 
  src="${domain}/" 
  width="100%" 
  height="900" 
  frameborder="0" 
  allowfullscreen
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>`,
    },
  };

  const copyToClipboard = async (code: string, key: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      toast({
        title: "Copied!",
        description: "Embed code copied to clipboard",
      });
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <Code2 className="w-8 h-8 md:w-12 md:h-12 text-purple-600" />
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" data-testid="text-api-title">
              CreatiVista AI API
            </h1>
          </div>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2" data-testid="text-api-description">
            Integrate our powerful AI image generation and manipulation tools into your website. 
            Free for commercial use - no API key required!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader className="p-4 md:p-6">
              <Globe className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mb-2" />
              <CardTitle className="text-base md:text-lg">Easy Integration</CardTitle>
              <CardDescription className="text-sm">Simple iframe embed codes ready to use</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-pink-200 dark:border-pink-800">
            <CardHeader className="p-4 md:p-6">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-pink-600 mb-2" />
              <CardTitle className="text-base md:text-lg">Commercial Use Allowed</CardTitle>
              <CardDescription className="text-sm">Use our tools on any commercial website</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800 sm:col-span-2 md:col-span-1">
            <CardHeader className="p-4 md:p-6">
              <Code2 className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mb-2" />
              <CardTitle className="text-base md:text-lg">No API Key Needed</CardTitle>
              <CardDescription className="text-sm">Just copy and paste the embed code</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Embed Codes Section */}
        <Card className="mb-6 md:mb-8">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-xl md:text-2xl">Embed Codes</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Choose any of our AI tools to embed on your website. All tools are optimized for seamless integration.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <Tabs defaultValue="textToImage" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2 mb-4 md:mb-6 h-auto">
                <TabsTrigger value="textToImage" data-testid="tab-text-to-image" className="text-xs md:text-sm py-2">Text-to-Image</TabsTrigger>
                <TabsTrigger value="imageToImage" data-testid="tab-image-to-image" className="text-xs md:text-sm py-2">Transform</TabsTrigger>
                <TabsTrigger value="bgRemover" data-testid="tab-bg-remover" className="text-xs md:text-sm py-2">BG Remover</TabsTrigger>
                <TabsTrigger value="upscale" data-testid="tab-upscale" className="text-xs md:text-sm py-2">Upscale</TabsTrigger>
                <TabsTrigger value="imageToSketch" data-testid="tab-image-to-sketch" className="text-xs md:text-sm py-2">Sketch</TabsTrigger>
                <TabsTrigger value="canvasEditor" data-testid="tab-canvas-editor" className="text-xs md:text-sm py-2">Canvas</TabsTrigger>
                <TabsTrigger value="fullWidget" data-testid="tab-full-widget" className="col-span-2 md:col-span-3 lg:col-span-2 text-xs md:text-sm py-2">Full Widget</TabsTrigger>
              </TabsList>

              {Object.entries(embedCodes).map(([key, { title, description, code }]) => (
                <TabsContent key={key} value={key} className="space-y-3 md:space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2" data-testid={`text-embed-title-${key}`}>{title}</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4" data-testid={`text-embed-desc-${key}`}>{description}</p>
                  </div>

                  <div className="relative">
                    <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm" data-testid={`code-embed-${key}`}>
                      <code>{code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-2 right-2 text-xs md:text-sm h-7 md:h-8"
                      onClick={() => copyToClipboard(code, key)}
                      data-testid={`button-copy-${key}`}
                    >
                      {copiedStates[key] ? (
                        <>
                          <Check className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 md:p-4">
                    <h4 className="text-sm md:text-base font-semibold text-blue-900 dark:text-blue-300 mb-2">Usage Tips:</h4>
                    <ul className="list-disc list-inside text-xs md:text-sm text-blue-800 dark:text-blue-400 space-y-1">
                      <li>Adjust the width and height to fit your layout</li>
                      <li>The iframe is responsive and works on mobile devices</li>
                      <li>You can customize the border-radius and shadow styling</li>
                      <li>No attribution required, but always appreciated!</li>
                    </ul>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Terms Section */}
        <Card className="border-green-200 dark:border-green-800 mb-6 md:mb-8">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg text-green-700 dark:text-green-400">✓ Commercial Use Allowed</CardTitle>
            <CardDescription className="text-sm md:text-base">
              You are free to use these embed codes on any website, including commercial projects. 
              Our tools are provided as-is for integration purposes. Please ensure your use complies 
              with our Terms & Conditions and Privacy Policy.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Technical Details */}
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg text-blue-700 dark:text-blue-400">Technical Details</CardTitle>
            <CardDescription className="text-sm md:text-base">
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Iframe Support:</strong> All pages are optimized for iframe embedding with no X-Frame-Options restrictions</li>
                <li><strong>Cross-Origin:</strong> Works on any domain without CORS issues</li>
                <li><strong>Responsive:</strong> Automatically adapts to container width</li>
                <li><strong>SSL/HTTPS:</strong> Fully secured for production use</li>
              </ul>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Support Section */}
        <div className="mt-6 md:mt-8 text-center">
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4 px-4">
            Need help with integration or have questions?
          </p>
          <Button asChild variant="outline" size="sm" className="md:h-10" data-testid="button-contact-support">
            <a href="/contact-us">Contact Support</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
