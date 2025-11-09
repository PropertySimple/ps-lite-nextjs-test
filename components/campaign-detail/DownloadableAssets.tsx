import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { logger } from "@/lib/logger";

const videoAssets = [
  {
    id: 1,
    title: "Basic Listing Video",
    thumbnail: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/dllxfbgxs/video/upload/v1746035725/Jeff_Fisher_Whitefish_Caption_1_p8u3yc.mp4",
  },
  {
    id: 2,
    title: "Premium Listing Presentation",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/dllxfbgxs/video/upload/v1746035725/Jeff_Fisher_Whitefish_Caption_1_p8u3yc.mp4",
  },
];

const DownloadableAssets = () => {
  const handleDownload = (videoUrl: string, title: string) => {
    // In a real app, this would trigger the actual download
    logger.log(`Downloading ${title} from ${videoUrl}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base sm:text-lg">Ad Assets</CardTitle>
            <Badge variant="secondary" className="hidden sm:inline-flex">{videoAssets.length} Videos</Badge>
          </div>
        </div>
      </CardHeader>
      {(
        <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {videoAssets.map((asset) => (
            <div key={asset.id} className="space-y-4">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  poster={asset.thumbnail}
                  controls
                  preload="metadata"
                >
                  <source src={asset.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{asset.title}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownload(asset.videoUrl, asset.title)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      )}
    </Card>
  );
};

export default DownloadableAssets;
