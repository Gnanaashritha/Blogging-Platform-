import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from './AuthModal';

interface AuthGateProps {
  children: React.ReactNode;
  triggerPercentage?: number;
}

export const AuthGate = ({ children, triggerPercentage = 50 }: AuthGateProps) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user || hasTriggered) return;

    const handleScroll = () => {
      if (!contentRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrolled >= triggerPercentage) {
        setShowAuthModal(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, triggerPercentage, hasTriggered]);

  // If user is authenticated or hasn't triggered yet, show all content
  if (user || !hasTriggered) {
    return <div ref={contentRef}>{children}</div>;
  }

  // If triggered but not authenticated, show content with overlay
  return (
    <>
      <div ref={contentRef} className="relative">
        {children}
        {!user && hasTriggered && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="text-center space-y-4 max-w-md mx-auto p-6">
              <h2 className="text-2xl font-bold">Continue Reading</h2>
              <p className="text-muted-foreground">
                You've reached the preview limit. Sign in or create an account to continue reading this article.
              </p>
            </div>
          </div>
        )}
      </div>
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
};