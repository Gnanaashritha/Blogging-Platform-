
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BlogPost } from '@/components/BlogCard';

interface BlogStore {
  blogs: BlogPost[];
  addBlog: (blog: BlogPost) => void;
  searchBlogs: (query: string) => BlogPost[];
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      blogs: [],
      addBlog: (blog: BlogPost) => set((state) => ({
        blogs: [...state.blogs, blog]
      })),
      searchBlogs: (query: string) => {
        const { blogs } = get();
        const allBlogs = [...blogs];
        
        if (!query) return allBlogs;
        
        const lowercaseQuery = query.toLowerCase();
        return allBlogs.filter(blog => 
          blog.title.toLowerCase().includes(lowercaseQuery) ||
          blog.excerpt.toLowerCase().includes(lowercaseQuery) ||
          blog.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        );
      },
    }),
    {
      name: 'blog-storage',
    }
  )
);
