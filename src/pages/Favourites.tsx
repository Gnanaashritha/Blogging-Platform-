import React from 'react';
import { useFavouritesStore } from '../store/favouritesStore';
import { useBlogStore } from '../store/blogStore';
import BlogCard from '../components/BlogCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Favourites: React.FC = () => {
  const { favourites } = useFavouritesStore();
  const { blogs } = useBlogStore();

  const favouriteBlogs = blogs.filter((blog) => favourites.includes(blog.id));

  return (
    <div className="flex flex-col min-h-screen page-with-navbar">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-6">Favourite Blogs</h2>
        {favouriteBlogs.length === 0 ? (
          <p className="text-muted-foreground text-center">No favourites yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {favouriteBlogs.map((blog) => (
              <BlogCard key={blog.id} post={blog} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favourites;