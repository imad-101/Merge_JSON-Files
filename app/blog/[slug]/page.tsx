import type React from "react";
import { getPostData, type PostData } from "@/lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft, Calendar, Clock, Tag } from "lucide-react";
import { ShareFooter } from "./ShareFooter";
// ✅ Define shared PageProps type
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ✅ generateMetadata using correct type
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params; // Await the params since it's now a Promise

  let post: PostData;
  try {
    post = await getPostData(slug);
  } catch {
    return {
      title: "Not Found",
      description: "This page does not exist",
    };
  }

  return {
    title: `${post.title} | Merge JSON Files`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://merge-json-files.com/blog/${slug}`,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      images: [
        {
          url: post.thumbnail || "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      authors: [post.authorName],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.thumbnail || "/og-default.jpg"],
      creator: `@${post.authorName.replace(/\s+/g, "")}`,
    },
  };
}

// ✅ EnhancedCodeBlock stays the same
const EnhancedCodeBlock = ({
  inline,
  children,
  ...props
}: {
  inline?: boolean;
  children?: React.ReactNode;
}) => {
  if (inline) {
    return (
      <code
        className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md font-mono text-sm border border-blue-100"
        {...props}
      >
        {children}
      </code>
    );
  }
  return (
    <div className="my-8 overflow-x-auto rounded-xl bg-gray-900 text-gray-100 shadow-2xl">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="text-sm font-mono text-gray-400">Code Snippet</span>
      </div>
      <pre className="p-4">
        <code className="font-mono text-sm leading-relaxed" {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

// ✅ Page component with correct props type
export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  let post: PostData;
  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }

  const postUrl = `https://merge-json-files.com/blog/${slug}`;

  return (
    <>
      <Header first="Merge" second="JSON" third="Files" href="/" />

      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 -ml-3 group text-lg"
            >
              <ChevronLeft className="h-6 w-6 mr-2 transition-transform group-hover:-translate-x-1" />
              All Articles
            </Button>
          </Link>
        </div>

        <article className="space-y-12">
          <header className="space-y-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <Calendar className="h-5 w-5" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5" />
                <span>{post.readTime} read</span>
              </div>
              {(post.tags?.length ?? 0) > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(post.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                    >
                      <Tag className="h-4 w-4" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h1 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 pt-8">
              <Avatar className="h-16 w-16 border-2 border-white shadow-xl">
                {post.authorImage ? (
                  <AvatarImage src={post.authorImage} alt={post.authorName} />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">
                    {post.authorName[0]}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900 text-xl">
                  {post.authorName}
                </p>
                <p className="text-gray-500 mt-1">Full Stack Developer</p>
              </div>
            </div>
          </header>

          {post.thumbnail && (
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-700 text-left">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({ ...props }) => (
                  <h2
                    className="text-4xl font-bold text-gray-900 mt-16 mb-8 pt-8 border-t border-gray-100"
                    {...props}
                  />
                ),
                h3: ({ ...props }) => (
                  <h3
                    className="text-2xl font-semibold text-gray-900 mt-12 mb-6"
                    {...props}
                  />
                ),
                p: ({ ...props }) => (
                  <p
                    className="text-xl leading-relaxed text-gray-700 mb-8"
                    {...props}
                  />
                ),
                a: ({ ...props }) => (
                  <a
                    className="text-blue-600 hover:text-blue-500 font-medium underline underline-offset-4 decoration-2 transition-colors"
                    {...props}
                  />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-l-4 border-blue-500 bg-blue-50 pl-8 py-6 my-8 italic text-gray-700 rounded-r-xl"
                    {...props}
                  />
                ),
                ul: ({ ...props }) => (
                  <ul
                    className="list-disc space-y-4 pl-8 my-8 text-xl"
                    {...props}
                  />
                ),
                ol: ({ ...props }) => (
                  <ol
                    className="list-decimal space-y-4 pl-8 my-8 text-xl"
                    {...props}
                  />
                ),
                code: EnhancedCodeBlock,
                table: ({ ...props }) => (
                  <div className="my-8 overflow-x-auto rounded-xl border shadow-sm">
                    <table className="w-full border-collapse" {...props} />
                  </div>
                ),
                th: ({ ...props }) => (
                  <th
                    className="bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900 border-b text-lg"
                    {...props}
                  />
                ),
                td: ({ ...props }) => (
                  <td
                    className="px-6 py-4 text-left border-b text-gray-700"
                    {...props}
                  />
                ),
                img: ({ src, alt }) =>
                  src && (
                    <figure className="my-12">
                      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-video shadow-lg">
                        <Image
                          src={src}
                          alt={alt || "Post image"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {alt && (
                        <figcaption className="mt-4 text-sm text-gray-500 italic">
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <ShareFooter title={post.title} url={postUrl} />

          <div className="mt-12">
            <Link href="/blog">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 group text-lg pl-0"
              >
                <ChevronLeft className="h-6 w-6 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to All Articles
              </Button>
            </Link>
          </div>
        </article>
      </main>

      <Footer name="Merge JSON Files" />
    </>
  );
}
