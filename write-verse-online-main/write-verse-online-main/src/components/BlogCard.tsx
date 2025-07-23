
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share, BookOpen } from "lucide-react";
import { toast } from "sonner";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  coverImage?: string;
  tags?: string[];
  likes?: number;
  content?: string; // Added content field
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
      toast.info("Removed from favorites");
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      toast.success("Added to favorites");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.origin + `/blog/${post.id}`,
      });
      toast.success("Shared successfully!");
    } catch (error) {
      // If Web Share API is not supported, copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/blog/${post.id}`);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <Card className={`overflow-hidden h-full transition-shadow hover:shadow-md ${featured ? 'md:flex' : ''}`}>
      {post.coverImage ? (
        <div className={`${featured ? 'md:w-1/2' : 'w-full h-48'}`}>
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={`${featured ? 'md:w-1/2' : 'w-full h-48'} bg-muted flex items-center justify-center`}>
          <BookOpen className="h-12 w-12 text-muted-foreground/50" />
        </div>
      )}
      <div className={`${featured ? 'md:w-1/2' : 'w-full'}`}>
        <CardHeader className="p-4 md:p-6">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.filter(tag => tag.trim() !== '').slice(0, 3).map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-muted text-xs px-2 py-1 rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <Link to={`/blog/${post.id}`}>
            <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} hover:text-primary transition-colors`}>
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
        </CardHeader>
        <CardFooter className="p-4 md:p-6 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              {post.author} • {post.readTime} • {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
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
        </CardFooter>
      </div>
    </Card>
  );
};

export default BlogCard;
