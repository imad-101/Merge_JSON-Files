// app/blog/page.tsx
import { getSortedPostsData } from "@/lib/posts";
import AdUnit from "@/components/AdUnit";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ImagePlaceholder } from "@/components/image-placeholder";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Tools Guides & Tutorials | Merge JSON Files",
  description:
    "Expert articles on JSON manipulation, merging techniques, and best practices. Enhance your JSON skills with our comprehensive guides.",
  openGraph: {
    title: "JSON Tools Guides & Tutorials | Merge JSON Files",
    description:
      "Expert articles on JSON manipulation, merging techniques, and best practices. Enhance your JSON skills with our comprehensive guides.",
    url: "https://merge-json-files.com/blog",
    images: [
      {
        url: "https://merge-json-files.com/og-blog.png",
        width: 1200,
        height: 630,
        alt: "JSON Blog Articles",
      },
    ],
  },
  alternates: {
    canonical: "https://merge-json-files.com/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header first="Merge" second="JSON" third="Files" href="/" />

        <Breadcrumb
          aria-label="Breadcrumb"
          className="mt-6 max-w-6xl mx-auto px-4 hidden sm:block text-xl"
        >
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <main className="flex-1">
          <section className="w-full py-12 md:py-10">
            <div className="container px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  JSON Tools & Best Practices Guide
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                  Master JSON manipulation with our expert-written tutorials,
                  merging guides, and optimization techniques
                </p>
              </div>
            </div>
          </section>

          <div className="my-5">
            <AdUnit name="responsive1" />
          </div>

          <section className="w-full pb-24">
            <div className="container px-4 md:px-6">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {allPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    {post.thumbnail ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.thumbnail}
                          alt={`Thumbnail for ${post.title}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                        />
                      </div>
                    ) : (
                      <ImagePlaceholder />
                    )}

                    <CardHeader className="pt-5">
                      <CardTitle
                        className="text-xl font-semibold"
                        itemProp="headline"
                      >
                        <Link
                          href={`/blog/${post.id}`}
                          className="hover:text-blue-600"
                          itemProp="url"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p
                        className="text-gray-600 line-clamp-3 mb-6"
                        itemProp="description"
                      >
                        {post.description}
                      </p>

                      <div className="flex items-center gap-4 border-t pt-4">
                        {post.authorImage ? (
                          <Image
                            src={post.authorImage}
                            alt={post.authorName}
                            width={40}
                            height={40}
                            className="rounded-full"
                            itemProp="image"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="text-gray-500" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4
                            className="font-medium text-gray-900"
                            itemProp="author"
                          >
                            {post.authorName}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <time itemProp="datePublished">
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                            <span aria-hidden="true">•</span>
                            <span itemProp="timeRequired">{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer name="Merge JSON Files" />
      </div>
    </>
  );
}
