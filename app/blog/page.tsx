import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const BlogPage = () => {
  return (
    <>
      <Header first="Merge " second="JSON " third="Files" href="/" />
      <div className="bg-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Articles & Blogposts
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Stay tuned for insightful articles and updates.
            </p>
          </header>

          {/* Placeholder Content */}
          <div className="text-center">
            <p className="text-gray-700 text-xl">
              No blog posts available at the moment. Please check back later.
            </p>
          </div>
        </div>
      </div>
      <Footer name="Merge JSON Files" />
    </>
  );
};

export default BlogPage;
