
import React from "react";

export const BlogContent = ({ content }: { content: string }) => {
  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return <br key={index} />;
      
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.substring(3)}</h2>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{paragraph.substring(4)}</h3>;
      }
      
      if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
        return (
          <li key={index} className="ml-6 list-decimal my-1">
            {paragraph.substring(paragraph.indexOf(' ') + 1)}
          </li>
        );
      }
      
      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        return (
          <li key={index} className="ml-6 list-disc my-1">
            {paragraph.substring(2)}
          </li>
        );
      }
      
      return <p key={index} className="my-4">{paragraph}</p>;
    });
  };

  return (
    <div className="blog-content prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  );
};
