
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share } from "lucide-react";
import { toast } from "sonner";

interface BlogHeaderProps {
  title: string;
  author: string;
  date: string;
  readTime: string;
  tags?: string[];
  likes: number;
  isLiked: boolean;
  onLike: () => void;
}

export const BlogHeader = ({
  title,
  author,
  date,
  readTime,
  tags,
  likes,
  isLiked,
  onLike,
}: BlogHeaderProps) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: title,
        url: window.location.href,
      });
      toast.success("Shared successfully!");
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="mb-8">
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-secondary px-3 py-1 rounded-full text-sm text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        {title}
      </h1>
      
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground">
          <span className="font-medium">{author}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{readTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onLike}
            className={isLiked ? 'text-red-500' : ''}
            aria-label="Like post"
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            {likes > 0 && <span className="ml-1 text-sm">{likes}</span>}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            aria-label="Share post"
          >
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
