"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface SocialShareSectionProps {
  title: string;
  url?: string;
}

export default function SocialShareSection({ title, url }: SocialShareSectionProps) {
  const [currentUrl, setCurrentUrl] = useState(url || "");

  // Get the current page URL on the client side if not provided
  useEffect(() => {
    if (!url) {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  // Share on Twitter
  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this event: ${title} #DarkSkyKenya #Astronomy #StarGazing`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  // Share on Facebook
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, "_blank", "width=550,height=420");
  };

  return (
    <div className="mt-6 p-6 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
      <h3 className="font-semibold mb-3">Share this Event</h3>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-[#1DA1F2] hover:text-[#1DA1F2]/90 hover:bg-blue-50 dark:hover:bg-blue-950/30"
          onClick={shareOnTwitter}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
          Tweet
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-[#4267B2] hover:text-[#4267B2]/90 hover:bg-blue-50 dark:hover:bg-blue-950/30"
          onClick={shareOnFacebook}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
          Share
        </Button>
      </div>
    </div>
  );
}
