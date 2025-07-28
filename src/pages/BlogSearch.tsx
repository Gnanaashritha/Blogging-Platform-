import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useBlogStore } from "@/store/blogStore";

const BlogSearch = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialQuery = searchParams.get("q") || "";

    const [query, setQuery] = useState(initialQuery);
    const searchBlogs = useBlogStore((state) => state.searchBlogs);
    const [hasSearched, setHasSearched] = useState(!!initialQuery);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(query)}`);
        setHasSearched(true);
    };

    const searchResults = hasSearched ? searchBlogs(query) : [];

    return (
        <div className="flex flex-col min-h-screen page-with-navbar">
            <Navbar />

            <main className="flex-grow py-10">
                <div className="container-custom">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-8">
                        Search Blog Posts
                    </h1>

                    <form onSubmit={handleSearch} className="mb-12 max-w-2xl">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search by title, content, or tag..."
                                    className="h-12"
                                />
                            </div>
                            <Button type="submit" className="h-12">
                                <SearchIcon className="mr-2 h-5 w-5" />
                                Search
                            </Button>
                        </div>
                    </form>

                    {hasSearched && (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-2">
                                    {searchResults.length}{" "}
                                    {searchResults.length === 1
                                        ? "result"
                                        : "results"}{" "}
                                    found
                                    {query && ` for "${query}"`}
                                </h2>
                            </div>

                            {searchResults.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {searchResults.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-muted/30 rounded-lg">
                                    <h3 className="text-xl font-medium mb-2">
                                        No results found
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        Try different keywords or browse our
                                        recent posts
                                    </p>
                                    <Button
                                        onClick={() => navigate("/")}
                                        variant="outline"
                                    >
                                        Browse Recent Posts
                                    </Button>
                                </div>
                            )}
                        </>
                    )}

                    {!hasSearched && (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-bold mb-2">
                                Start searching
                            </h2>
                            <p className="text-muted-foreground max-w-lg mx-auto">
                                Search for blog posts by title, content, or
                                tags. Discover interesting articles from our
                                writers.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogSearch;
