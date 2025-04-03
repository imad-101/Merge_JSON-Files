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
import {
  ChevronLeft,
  Calendar,
  Clock,
  Hash,
  CornerDownRight,
} from "lucide-react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getHeadings(
  content: string
): { level: number; text: string; id: string }[] {
  const lines = content.split("\n");
  const headings = lines
    .filter((line) => /^#{2,3}\s/.test(line))
    .map((line) => {
      const match = /^(#{2,3})\s+(.*)/.exec(line);
      if (!match) return null;
      const level = match[1].length;
      const text = match[2].trim();
      return { level, text, id: slugify(text) };
    })
    .filter(Boolean) as { level: number; text: string; id: string }[];
  return headings;
}

const TableOfContents = ({ content }: { content: string }) => {
  const headings = getHeadings(content);
  if (headings.length === 0) return null;
  return (
    <aside className="hidden lg:block sticky top-24 w-72 self-start p-4 border-l bg-gray-50 py-3 px-7 rounded-lg">
      <div className="space-y-4">
        <h2 className="text-lg font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <Hash className="h-6 w-6" />
          Table of Contents
        </h2>
        <ul className="space-y-3 text-gray-700">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`transition-colors ${
                heading.level === 2 ? "ml-0 font-medium" : "ml-4 text-sm"
              }`}
            >
              <a
                href={`#${heading.id}`}
                className="text-muted-foreground hover:text-primary flex items-start gap-2 toc-link"
                data-id={heading.id}
              >
                {heading.level === 3 && (
                  <CornerDownRight className="h-4 w-4 mt-1 flex-shrink-0" />
                )}
                <span className="leading-snug">{heading.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

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
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    );
  }
  return (
    <div className="my-4 overflow-x-auto rounded-lg border shadow-sm bg-gray-900 text-white">
      <div className="flex items-center gap-2 bg-gray-800 px-3 py-1">
        <span className="h-3 w-3 rounded-full bg-red-600" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-600" />
      </div>
      <pre className="p-4">
        <code className="font-mono text-sm" {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export async function generateMetadata(context: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await context.params;
  const { slug } = params;
  const post = await getPostData(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://merge-json-files.com/blog/${slug}`,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params before destructuring
  const { slug } = await params;

  let post: PostData;
  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Header first="Merge" second="JSON" third="Files" href="/" />

      <div className="container mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row">
        <main className="w-full md:max-w-5xl mx-auto bg-slate-50 px-4 md:px-12 py-5 md:py-8 rounded-lg shadow-sm">
          <div className="mb-10">
            <Link href="/blog">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 -ml-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                All Articles
              </Button>
            </Link>
          </div>

          <article className="space-y-8">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                {(post.tags?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {(post.tags ?? []).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h1 className="text-3xl text-gray-900 md:text-4xl font-bold tracking-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 pt-4">
                <Avatar className="h-10 w-10">
                  {post.authorImage ? (
                    <AvatarImage src={post.authorImage} alt={post.authorName} />
                  ) : (
                    <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium">{post.authorName}</p>
                  <p className="text-sm text-gray-500">Full-Stack Developer</p>
                </div>
              </div>
            </header>

            {post.thumbnail && (
              <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg text-gray-800  max-w-none my-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h2: ({ ...props }) => {
                    const text = props.children?.toString() || "";
                    return (
                      <h2
                        id={slugify(text)}
                        className="text-2xl md:text-3xl font-semibold mt-8 mb-4 scroll-mt-24"
                        {...props}
                      />
                    );
                  },
                  h3: ({ ...props }) => {
                    const text = props.children?.toString() || "";
                    return (
                      <h3
                        id={slugify(text)}
                        className="text-xl md:text-2xl font-semibold mt-6 mb-3 scroll-mt-24"
                        {...props}
                      />
                    );
                  },
                  p: ({ ...props }) => (
                    <p className="text-base leading-relaxed mb-4" {...props} />
                  ),
                  a: ({ ...props }) => (
                    <a
                      className="text-blue-600 hover:text-blue-500 underline underline-offset-4"
                      {...props}
                    />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="mt-4 border-l-4 border-gray-300 pl-4 italic text-gray-600"
                      {...props}
                    />
                  ),
                  ul: ({ ...props }) => (
                    <ul
                      className="my-4 ml-6 list-disc [&>li]:mt-2"
                      {...props}
                    />
                  ),
                  ol: ({ ...props }) => (
                    <ol
                      className="my-4 ml-6 list-decimal [&>li]:mt-2"
                      {...props}
                    />
                  ),
                  code: EnhancedCodeBlock,
                  table: ({ ...props }) => (
                    <div className="my-4 w-full overflow-x-auto">
                      <table className="w-full" {...props} />
                    </div>
                  ),
                  th: ({ ...props }) => (
                    <th
                      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                      {...props}
                    />
                  ),
                  td: ({ ...props }) => (
                    <td
                      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                      {...props}
                    />
                  ),
                  img: ({ src, alt }: { src?: string; alt?: string }) =>
                    src ? (
                      <figure className="my-4 flex flex-col items-center">
                        <Image
                          src={src}
                          alt={alt || "Post image"}
                          width={600}
                          height={400}
                          className="rounded-lg border bg-gray-200"
                        />
                        {alt && (
                          <figcaption className="mt-2 text-center text-sm text-gray-500">
                            {alt}
                          </figcaption>
                        )}
                      </figure>
                    ) : null,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </main>

        <TableOfContents content={post.content} />
      </div>

      <Footer name="Merge JSON Files" />
    </>
  );
}
