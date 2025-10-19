import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, ImageIcon, Trash2, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { CommunityImage } from "@shared/schema";

const artStyles = [
  "realistic", "cinematic", "cyberpunk", "anime", "manga", "ghibli", "comic", "impressionist",
  "pixel art", "abstract", "sketch", "fantasy", "3d render", "watercolor", "oil painting",
  "pop art", "steampunk", "digital painting", "cartoon", "gothic", "isometric", "sci-fi",
  "minimalist", "vaporwave", "synthwave", "dystopian", "utopian", "art deco", "art nouveau",
  "cubist", "surrealist", "futuristic", "retrowave", "photography", "3D Render", "Anime",
  "Cartoon", "Abstract", "Fantasy"
];

const aspectRatios = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Landscape (16:9)" },
  { value: "4:3", label: "Standard (4:3)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "3:4", label: "Portrait (3:4)" },
];

export default function Admin() {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState("");
  const [artStyle, setArtStyle] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");

  const { data: communityImages, isLoading: imagesLoading } = useQuery<CommunityImage[]>({
    queryKey: ["/api/community-images"],
  });

  const addImageMutation = useMutation({
    mutationFn: async (data: { imageUrl: string; artStyle: string; aspectRatio: string }) => {
      const response = await fetch("/api/admin/community-images", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add image");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community-images"] });
      toast({
        title: "Success",
        description: "Community image added successfully",
      });
      setImageUrl("");
      setArtStyle("");
      setAspectRatio("1:1");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add community image",
        variant: "destructive",
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/community-images/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete image");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community-images"] });
      toast({
        title: "Success",
        description: "Community image deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete community image",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !artStyle || !aspectRatio) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    addImageMutation.mutate({ imageUrl, artStyle, aspectRatio });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-foreground">
            <Shield className="w-8 h-8 text-primary" />
            Admin Panel
          </h1>
          <p className="text-muted-foreground mt-2">Manage community creation images</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Add Community Image
              </CardTitle>
              <CardDescription>
                Add images to the community creation gallery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                    data-testid="input-image-url"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="artStyle">Art Style</Label>
                  <Select value={artStyle} onValueChange={setArtStyle} required>
                    <SelectTrigger id="artStyle" data-testid="select-art-style">
                      <SelectValue placeholder="Select art style" />
                    </SelectTrigger>
                    <SelectContent>
                      {artStyles.map((style) => (
                        <SelectItem key={style} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio} required>
                    <SelectTrigger id="aspectRatio" data-testid="select-aspect-ratio">
                      <SelectValue placeholder="Select aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      {aspectRatios.map((ratio) => (
                        <SelectItem key={ratio.value} value={ratio.value}>
                          {ratio.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={addImageMutation.isPending}
                  data-testid="button-add-image"
                >
                  {addImageMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Image"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Images ({communityImages?.length || 0})</CardTitle>
              <CardDescription>Manage existing community images</CardDescription>
            </CardHeader>
            <CardContent>
              {imagesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : communityImages && communityImages.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {communityImages.map((image) => (
                    <div
                      key={image.id}
                      className="flex items-start gap-3 p-3 border rounded-lg bg-card"
                      data-testid={`community-image-${image.id}`}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.artStyle}
                        className="w-20 h-20 object-cover rounded"
                        data-testid={`image-thumbnail-${image.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{image.artStyle}</p>
                        <p className="text-xs text-muted-foreground">{image.aspectRatio}</p>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {image.imageUrl}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteImageMutation.mutate(image.id)}
                        disabled={deleteImageMutation.isPending}
                        data-testid={`button-delete-${image.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No community images yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
