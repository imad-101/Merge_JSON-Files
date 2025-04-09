"use client";

import {
  Twitter,
  Linkedin,
  Facebook,
  //   Reddit,
  Newspaper,
  Mail,
  Link as LinkIcon,
} from "lucide-react";

export const ShareFooter = ({ title, url }: { title: string; url: string }) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch {
      alert("Failed to copy link");
    }
  };

  return (
    <div className="border-t border-gray-100 pt-12 mt-12">
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Share this article
        </h3>
        <div className="flex flex-wrap gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              title
            )}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-3 border hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <Twitter className="h-5 w-5" />
            <span className="text-sm">Twitter</span>
          </a>

          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              url
            )}&title=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-3 border hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <Linkedin className="h-5 w-5" />
            <span className="text-sm">LinkedIn</span>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-3 border hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <Facebook className="h-5 w-5" />
            <span className="text-sm">Facebook</span>
          </a>

          <a
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(
              url
            )}&title=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-3 border hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            {/* <Reddit className="h-5 w-5" /> */}
            <span className="text-sm">Reddit</span>
          </a>

          <a
            href={`https://news.ycombinator.com/submitlink?u=${encodeURIComponent(
              url
            )}&t=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-3 border hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <Newspaper className="h-5 w-5" />
            <span className="text-sm">Hacker News</span>
          </a>

          <a
            href={`mailto:?subject=${encodeURIComponent(
              title
            )}&body=${encodeURIComponent(`${title} - ${url}`)}`}
            className="rounded-lg p-3 border hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <Mail className="h-5 w-5" />
            <span className="text-sm">Email</span>
          </a>

          <button
            onClick={handleCopyLink}
            className="rounded-lg p-3 border hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <LinkIcon className="h-5 w-5" />
            <span className="text-sm">Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};
