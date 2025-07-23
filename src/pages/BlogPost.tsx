import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogPost as BlogPostType } from "@/components/BlogCard";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useBlogStore } from "@/store/blogStore";
import { BlogPostSkeleton } from "@/components/blog/BlogPostSkeleton";
import { BlogPostError } from "@/components/blog/BlogPostError";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogHeader } from "@/components/blog/BlogHeader";

const mockPosts: Record<string, BlogPostType & { fullContent: string }> = {
  "1": {
    id: "1",
    title: "The Art of Creative Writing: Finding Your Unique Voice",
    excerpt: "Discover how to develop your unique writing style and create content that resonates with your audience.",
    author: "Jane Austen",
    date: "Apr 20, 2025",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Writing", "Creativity", "Self-Improvement"],
    fullContent: `
      Finding your unique writing voice is perhaps the most important part of becoming a writer that stands out from the crowd. Your voice is your literary fingerprint—it's what makes your writing distinctively yours.

      ## What is a writing voice?

      Your writing voice is the way your personality comes through in your writing. It includes your word choice, syntax, sentence structure, and the rhythm of your prose. It's how readers can identify your writing even without seeing your name.

      ## Why is finding your voice important?

      In a world filled with content, having a distinctive voice helps you:
      
      1. **Connect with readers on a deeper level**
      2. **Stand out in a crowded marketplace**
      3. **Build a loyal readership that recognizes your work**
      4. **Express yourself more authentically**

      ## How to develop your unique voice

      ### Read widely and deeply

      The more you read, the more you'll understand different writing styles and be able to identify what resonates with you. Don't just stick to one genre—explore widely.

      ### Write regularly

      Like any skill, writing improves with practice. The more you write, the more natural your voice will become. Don't worry about perfection in early drafts; focus on getting your thoughts on the page.

      ### Experiment with different styles

      Try writing in different tones, perspectives, and formats. You might discover aspects of writing that feel more natural to you than others.

      ### Be authentic

      The most compelling voices in writing are those that feel genuine. Don't try to sound like someone else or use vocabulary that feels unnatural to you.

      ### Embrace your quirks

      Those little writing habits that make you different? They're not flaws—they're features of your unique voice. Embrace them.

      ## Final thoughts

      Finding your voice isn't something that happens overnight. It's a process of continuous exploration and refinement. Be patient with yourself, and remember that your voice will evolve as you grow as a writer and as a person.

      The most important thing is to keep writing, keep reading, and stay true to yourself. Your unique voice is waiting to be discovered, and the world needs to hear what only you can say.
    `
  },
  "2": {
    id: "2",
    title: "10 Essential Tips for Blog Writing Success",
    excerpt: "Learn the fundamental practices that can elevate your blog writing from amateur to professional.",
    author: "Ernest Hemingway",
    date: "Apr 18, 2025",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Blogging", "Tips", "Writing"],
    fullContent: `
      Blogging has become one of the most effective ways to share information, build authority, and connect with an audience. Whether you're blogging for business or pleasure, these ten tips will help you create content that engages readers and achieves your goals.

      ## 1. Know Your Audience

      The foundation of successful blog writing is understanding who you're writing for. Research your target audience's interests, pain points, and preferences to create content that resonates with them.

      ## 2. Craft Compelling Headlines

      Your headline is the first thing readers see, and it determines whether they'll click through to read more. Spend time creating headlines that are clear, specific, and intriguing.

      ## 3. Structure for Readability

      Online readers tend to scan content rather than read word for word. Use short paragraphs, subheadings, bullet points, and numbered lists to make your content easy to digest.

      ## 4. Start Strong

      The opening paragraph of your blog post should hook readers and give them a reason to continue. Present a problem, share an interesting fact, or ask a thought-provoking question.

      ## 5. Provide Actionable Value

      Readers are looking for solutions and insights. Make sure your blog posts provide practical, useful information that readers can apply to their own lives or work.

      ## 6. Include Visual Elements

      Break up text with relevant images, infographics, videos, or charts. Visual elements make your content more engaging and help illustrate complex concepts.

      ## 7. Write in a Conversational Tone

      Blog writing is typically more casual than other forms of writing. Use a conversational tone, address readers directly, and let your personality shine through.

      ## 8. Edit Ruthlessly

      Good writing is rewriting. After drafting your post, go back and cut unnecessary words, fix errors, and refine your ideas. Consider reading your post aloud to catch awkward phrasing.

      ## 9. Optimize for SEO

      Help readers find your content by incorporating relevant keywords naturally throughout your post. Pay special attention to your title, headings, meta description, and first paragraph.

      ## 10. End with a Call to Action

      What do you want readers to do after reading your post? Whether it's leaving a comment, sharing on social media, subscribing to your newsletter, or trying your product, end with a clear call to action.

      By implementing these tips consistently, you'll create blog content that not only attracts readers but keeps them coming back for more. Remember that blogging is a skill that improves with practice, so don't be discouraged if your first few posts don't meet your expectations. Keep writing, keep learning, and keep refining your approach.
    `
  },
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<(BlogPostType & { fullContent?: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const storedBlogs = useBlogStore((state) => state.blogs);

  useEffect(() => {
    const fetchPost = () => {
      setLoading(true);
      
      setTimeout(() => {
        if (!id) {
          setError("Invalid blog ID");
          setLoading(false);
          return;
        }

        if (mockPosts[id]) {
          setPost(mockPosts[id]);
          setLoading(false);
          return;
        }
        
        const userBlog = storedBlogs.find(blog => blog.id === id);
        if (userBlog) {
          setPost({
            ...userBlog,
            fullContent: userBlog.content
          });
          setLoading(false);
        } else {
          setError("Blog post not found");
          setLoading(false);
        }
      }, 500);
    };
    
    fetchPost();
  }, [id, storedBlogs]);

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

  if (loading) return <BlogPostSkeleton />;
  if (error || !post) return <BlogPostError />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container-custom max-w-4xl">
          <Card className="overflow-hidden shadow-lg">
            {post.coverImage && (
              <div className="w-full h-80 md:h-96">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6 md:p-10">
              <BlogHeader
                title={post.title}
                author={post.author}
                date={post.date}
                readTime={post.readTime}
                tags={post.tags}
                likes={likes}
                isLiked={isLiked}
                onLike={handleLike}
              />
              
              <Separator className="my-6" />
              
              <BlogContent content={post.fullContent || post.content || ''} />
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
