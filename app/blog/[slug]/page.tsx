import { getPostData } from "@/lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import { ShareFooter } from "./ShareFooter";
import Script from "next/script";
import ProgressBar from "./ProgressBar";
// import AdUnit from "@/components/AdUnit";

// Declare adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostData(slug);
    return {
      metadataBase: new URL("https://merge-json-files.com"),
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
  } catch {
    return {
      title: "Not Found",
      description: "This page does not exist",
      metadataBase: new URL("https://merge-json-files.com"),
    };
  }
}

const EnhancedCodeBlock = ({
  inline,
  children,
  ...props
}: {
  inline?: boolean;
  children?: React.ReactNode;
}) => (
  <div
    className={
      !inline
        ? "my-8 overflow-x-auto rounded-xl bg-gray-900 text-gray-100 shadow-2xl"
        : ""
    }
  >
    {!inline && (
      <div className="flex items-center justify-between bg-gray-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="text-sm font-mono text-gray-400">Code Snippet</span>
      </div>
    )}
    <pre className={!inline ? "p-4" : ""}>
      <code
        className={`font-mono text-sm ${
          inline
            ? "bg-blue-50 text-blue-800 px-2 py-1 rounded-md border border-blue-100"
            : "leading-relaxed"
        }`}
        {...props}
      >
        {children}
      </code>
    </pre>
  </div>
);

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  let post;
  try {
    const { slug } = await params;
    post = getPostData(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
        crossOrigin="anonymous"
      />

      <Header first="Merge" second="JSON" third="Files" href="/" />
      <ProgressBar />

      <main className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        <div className="mb-8">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 -ml-3 group text-lg font-medium"
            >
              <ChevronLeft className="h-6 w-6 mr-2 transition-transform group-hover:-translate-x-1" />
              All Articles
            </Button>
          </Link>
        </div>

        <article className="space-y-12">
          <header className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} read</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 leading-tight tracking-tight md:text-5xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
              <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                {post.authorImage ? (
                  <AvatarImage src={post.authorImage} alt={post.authorName} />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xl">
                    {post.authorName[0]}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  {post.authorName}
                </p>
                <p className="text-gray-500 mt-1 text-sm">
                  Full Stack Developer
                </p>
              </div>
            </div>
          </header>

          {post.thumbnail && (
            <div className="relative aspect-[2/1.3] w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-700 text-left font-serif">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkUnwrapImages]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: (props) => (
                  <h2
                    className="text-3xl font-bold text-gray-900 mt-16 mb-6 pt-8 border-t border-gray-100"
                    {...props}
                  />
                ),
                h3: (props) => (
                  <h3
                    className="text-2xl font-semibold text-gray-900 mt-12 mb-6"
                    {...props}
                  />
                ),
                p: (props) => (
                  <p
                    className="text-xl leading-relaxed text-gray-700 mb-8"
                    {...props}
                  />
                ),
                a: (props) => (
                  <a
                    className="text-blue-600 hover:text-blue-500 font-medium underline underline-offset-4 decoration-1 transition-colors"
                    {...props}
                  />
                ),
                blockquote: (props) => (
                  <blockquote
                    className="border-l-4 border-blue-500 bg-blue-50 pl-6 pr-4 py-4 my-8 italic text-gray-700 rounded-r-lg"
                    {...props}
                  />
                ),
                ul: (props) => (
                  <ul
                    className="list-disc space-y-3 pl-6 my-6 text-xl marker:text-gray-400"
                    {...props}
                  />
                ),
                ol: (props) => (
                  <ol
                    className="list-decimal space-y-3 pl-6 my-6 text-xl marker:text-gray-400"
                    {...props}
                  />
                ),
                code: EnhancedCodeBlock,
                table: (props) => (
                  <div className="my-8 overflow-x-auto rounded-lg border shadow-sm">
                    <table className="w-full border-collapse" {...props} />
                  </div>
                ),
                th: (props) => (
                  <th
                    className="bg-gray-50 px-6 py-3 text-left font-semibold text-gray-900 border-b text-base"
                    {...props}
                  />
                ),
                td: (props) => (
                  <td
                    className="px-6 py-3 text-left border-b text-gray-700"
                    {...props}
                  />
                ),
                img: ({ src, alt }) =>
                  src && (
                    <figure className="my-8">
                      <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-video shadow-md">
                        <Image
                          src={src}
                          alt={alt || "Post image"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      {alt && (
                        <figcaption className="mt-3 text-sm text-gray-500 italic text-center">
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  ),
                hr: () => (
                  <>
                    <hr className="my-12 border-gray-200" />
                    <div className="my-12">
                      {/* <AdUnit name="article1" /> */}
                    </div>
                  </>
                ),
                div: (props) => {
                  if (props.className === "ad-placeholder-2") {
                    return (
                      <div className="my-12">
                        {/* <AdUnit name="article2" /> */}
                      </div>
                    );
                  }
                  return <div {...props} />;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="my-12">{/* <AdUnit name="responsive1" /> */}</div>

          <ShareFooter
            title={post.title}
            url={`https://merge-json-files.com/blog/${(await params).slug}`}
          />

          <div className="my-12">{/* <AdUnit name="responsive2" /> */}</div>

          <div className="mt-12 border-t border-gray-100 pt-8">
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
