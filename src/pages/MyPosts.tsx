import React, { useContext } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { useBlogStore } from "@/store/blogStore";
import { AuthContext } from "../App";

const MyPosts = () => {
  const { username } = useContext(AuthContext);
  const blogs = useBlogStore((state) => state.blogs);
  const myPosts = blogs.filter((post) => post.author === username);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">My Posts</h1>
          {myPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                You haven't written any blog posts yet. Start sharing your ideas!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyPosts; 