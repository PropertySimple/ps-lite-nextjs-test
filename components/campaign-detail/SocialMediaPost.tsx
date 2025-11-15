
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SocialMediaPostProps {
  platform: "instagram" | "facebook";
  username: string;
  image: string;
  caption: string;
  likes: string;
}

const SocialMediaPost = ({ platform: _platform, username, image, caption, likes }: SocialMediaPostProps) => {
  return (
    <Card className="max-w-sm mx-auto overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center p-3 border-b">
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
          <span className="text-xs font-medium">{username.charAt(0)}</span>
        </div>
        <span className="ml-3 font-medium text-sm">{username}</span>
        <div className="ml-auto">
          <Button variant="ghost" size="sm" className="h-auto p-1">
            <span className="text-lg">•••</span>
          </Button>
        </div>
      </div>

      {/* Post Image */}
      <div className="aspect-square bg-muted">
        <Image
          src={image}
          alt="Post content"
          width={600}
          height={600}
          className="w-full h-full object-cover"
          unoptimized={image.startsWith("http")}
        />
      </div>

      {/* Post Actions */}
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-auto p-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Button>
          <Button variant="ghost" size="sm" className="h-auto p-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Button>
          <Button variant="ghost" size="sm" className="h-auto p-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
          <div className="ml-auto">
            <Button variant="ghost" size="sm" className="h-auto p-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Likes */}
        <div className="text-sm font-medium">
          {likes}
        </div>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-medium">{username}</span> {caption}
        </div>

        {/* View Comments */}
        <div className="text-sm text-muted-foreground">
          View all comments
        </div>

        {/* Add Comment */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <input 
            type="text" 
            placeholder="Add a comm..."
            className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-2">
            <span className="text-red-500">❤️</span>
            <span className="text-yellow-500">😊</span>
            <span className="text-blue-500">➕</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SocialMediaPost;
