import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Palette, 
  Camera, 
  Sparkles, 
  Box, 
  Image, 
  Shapes, 
  Gamepad2, 
  Wand2, 
  Cpu, 
  Clock, 
  Circle, 
  Eye
} from 'lucide-react';
import type { CommunityImage } from '@shared/schema';

// Gallery image type (no longer using database)
type GalleryImage = {
  id: string;
  prompt: string;
  model: string;
  width: number;
  height: number;
  imageData: string;
  artStyle: string;
  userDisplayName: string | null;
  createdAt: string;
}

// Fallback images for when there are no user-generated images yet
const fallbackGalleryItems = [
  {
    id: "fallback-1",
    title: "Create Your First Image!",
    author: "Get Started",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600",
    alt: "Generate your first AI artwork",
    isFallback: true
  },
  {
    id: "fallback-2", 
    title: "Share with Community",
    author: "Join Us",
    category: "Community",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600",
    alt: "Share your creations",
    isFallback: true
  }
];

const CommunityGallery = () => {
  const limit = 500; // Maximum 500 images
  const [selectedArtStyle, setSelectedArtStyle] = useState<string>('all');

  // Art style filters
  const artStyleFilters = [
    { id: 'all', label: 'All', icon: Palette },
    { id: 'photograph', label: 'Photography', icon: Camera },
    { id: 'anime', label: 'Anime', icon: Sparkles },
    { id: '3d', label: '3D Render', icon: Box },
    { id: 'realistic', label: 'Realistic', icon: Image },
    { id: 'abstract', label: 'Abstract', icon: Shapes },
    { id: 'cartoon', label: 'Cartoon', icon: Gamepad2 },
    { id: 'fantasy', label: 'Fantasy', icon: Wand2 },
    { id: 'cyberpunk', label: 'Cyberpunk', icon: Cpu },
    { id: 'vintage', label: 'Vintage', icon: Clock },
    { id: 'minimalist', label: 'Minimalist', icon: Circle },
    { id: 'surreal', label: 'Surreal', icon: Eye }
  ];

  // Fetch community images from admin-added collection
  const { data: communityImages, isLoading, error } = useQuery<CommunityImage[]>({
    queryKey: ['/api/community-images'],
  });

  // Map stored art styles to filter categories
  const mapArtStyleToFilter = (artStyle: string): string => {
    const style = artStyle.toLowerCase();
    
    // Map specific art styles to filter categories
    if (style.includes('anime') || style.includes('manga') || style.includes('kawaii') || style.includes('ghibli')) {
      return 'anime';
    }
    
    if (style.includes('3d') || style.includes('render') || style.includes('blender') || style.includes('octane')) {
      return '3d';
    }
    
    if (style.includes('cyberpunk') || style.includes('futuristic') || style.includes('sci-fi')) {
      return 'cyberpunk';
    }
    
    if (style.includes('cartoon') || style.includes('animated') || style.includes('disney') || style.includes('comic')) {
      return 'cartoon';
    }
    
    if (style.includes('surreal') || style.includes('psychedelic') || style.includes('dreamlike')) {
      return 'surreal';
    }
    
    if (style.includes('fantasy') || style.includes('magical') || style.includes('mystical') || style.includes('medieval')) {
      return 'fantasy';
    }
    
    if (style.includes('vintage') || style.includes('retro') || style.includes('classic') || style.includes('sepia')) {
      return 'vintage';
    }
    
    if (style.includes('minimalist') || style.includes('minimal') || style.includes('simple') || style.includes('geometric')) {
      return 'minimalist';
    }
    
    if (style.includes('abstract') || style.includes('modern art') || style.includes('contemporary')) {
      return 'abstract';
    }
    
    if (style.includes('photograph') || style.includes('photography') || style.includes('photo') || style.includes('portrait') || style.includes('hdr')) {
      return 'photograph';
    }
    
    // Default to realistic for most common styles
    return 'realistic';
  };

  // Filter and transform community images to gallery format
  const transformCommunityImages = (images: CommunityImage[]) => {
    const filteredImages = images.filter(img => {
      // Filter by art style
      const styleMatch = selectedArtStyle === 'all' || mapArtStyleToFilter(img.artStyle) === selectedArtStyle;
      
      return styleMatch;
    });
    
    return filteredImages.map(img => ({
      id: img.id,
      title: img.artStyle,
      author: 'Community',
      category: img.artStyle,
      artStyle: img.artStyle,
      image: img.imageUrl,
      alt: `${img.artStyle} - ${img.aspectRatio}`,
      createdAt: img.createdAt.toString(),
      aspectRatio: img.aspectRatio
    }));
  };

  // Combine real images with fallbacks if needed
  const transformedImages = communityImages && communityImages.length > 0 ? transformCommunityImages(communityImages) : [];
  const galleryItems = transformedImages.length > 0 ? transformedImages : fallbackGalleryItems;
  
  // Check if we have no results for current filter
  const hasNoFilterResults = communityImages && communityImages.length > 0 && transformedImages.length === 0;


  const getCategoryColor = (category: string) => {
    const colors = {
      'flux': 'bg-primary/20 text-primary',
      'flux-schnell': 'bg-primary/20 text-primary',
      'flux-real': 'bg-primary/20 text-primary',
      'turbo': 'bg-primary/20 text-primary',
      'image-4': 'bg-primary/20 text-primary',
      'image-4-ultra': 'bg-primary/20 text-primary',
      'Tutorial': 'bg-muted text-foreground',
      'Community': 'bg-primary/20 text-primary'
    };
    return colors[category as keyof typeof colors] || 'bg-primary/20 text-primary';
  };

  return (
    <section id="gallery" className="pt-0 pb-16 bg-muted/20" data-testid="gallery-section">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-6 animate-fade-in">
          <h2 className="text-xl md:text-2xl font-bold font-headline text-foreground mb-4" data-testid="gallery-title">
            Community Creations
          </h2>
          
          {/* Art Style Filters - Horizontal Slider */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Art Style</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {artStyleFilters.map((filter) => {
                const isSelected = selectedArtStyle === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedArtStyle(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                      isSelected
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-card text-foreground border border-border hover:bg-muted hover:scale-102'
                    }`}
                    data-testid={`art-style-filter-${filter.id}`}
                  >
                    <filter.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          
        </div>


        {/* No results state for active filter */}
        {hasNoFilterResults && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Palette className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No images found with current filters
              </h3>
              <p className="text-muted-foreground mb-4">
                {selectedArtStyle !== 'all'
                  ? `No ${artStyleFilters.find(f => f.id === selectedArtStyle)?.label} images found`
                  : `No images found`
                }
              </p>
              <div className="flex gap-2 justify-center">
                {selectedArtStyle !== 'all' && (
                  <button
                    onClick={() => setSelectedArtStyle('all')}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    data-testid="reset-art-style-filter-button"
                  >
                    All Styles
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gallery grid */}
        {galleryItems.length > 0 && !hasNoFilterResults && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12 animate-slide-in">
            {galleryItems.map((item) => {
              // Get aspect ratio styling
              const getAspectRatioStyle = () => {
                if ('aspectRatio' in item) {
                  switch (item.aspectRatio) {
                    case '9:16':
                      return { aspectRatio: '9 / 16' };
                    case '3:4':
                      return { aspectRatio: '3 / 4' };
                    case '16:9':
                      return { aspectRatio: '16 / 9' };
                    case '4:3':
                      return { aspectRatio: '4 / 3' };
                    case '1:1':
                    default:
                      return {};
                  }
                }
                return {};
              };
              
              const isSquare = !('aspectRatio' in item) || item.aspectRatio === '1:1';
              const containerClass = isSquare
                ? "group relative aspect-square bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                : "group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer";
              
              return (
                <div 
                  key={item.id}
                  className={containerClass}
                  style={getAspectRatioStyle()}
                  data-testid={`gallery-item-${item.id}`}
                >
                  <img 
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-testid={`gallery-image-${item.id}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span 
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}
                          data-testid={`gallery-category-${item.id}`}
                        >
                          {item.category}
                        </span>
                        {'artStyle' in item && (
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30"
                            data-testid={`gallery-art-style-${item.id}`}
                          >
                            {item.artStyle}
                          </span>
                        )}
                      </div>
                      <h3 
                        className="text-white font-semibold mb-1 text-sm leading-tight"
                        data-testid={`gallery-title-${item.id}`}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-gray-200 text-xs"
                        data-testid={`gallery-author-${item.id}`}
                      >
                        by {item.author}
                      </p>
                      {'createdAt' in item && (
                        <p className="text-gray-300 text-xs mt-1">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default CommunityGallery;
