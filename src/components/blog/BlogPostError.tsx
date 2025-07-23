
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const BlogPostError = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container-custom text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <a href="/" className="text-primary hover:underline">
            Return to homepage
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};
