import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdUnit from "@/components/AdUnit";
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
  title: "Articles & Helpful Guides | Merge JSON Files",
  description:
    "Discover articles and helpful guides about our JSON tools and their uses, discover helpful content about JSON Files.",
  openGraph: {
    title: "Articles & Helpful Guides | Merge JSON Files",
    description:
      "Discover articles and helpful guides about Our JSON tools and their uses, discover helpful content about JSON Files.",
    url: "https://merge-json-files.com/blog",
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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
          crossOrigin="anonymous"
        ></script>
      </head>
      <div className="min-h-screen flex flex-col">
        <Header first="Merge" second="JSON" third="Files" href="/" />

        {/* Shadcn UI Breadcrumb */}
        <div className="mt-6 max-w-4xl mx-auto hidden sm:block text-xl">
          <Breadcrumb>
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
        </div>

        <main className="flex-1">
          <section className="w-full py-12 md:py-10">
            <div className="container px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  <AdUnit type="responsive" />
                  Articles and Helpful Guides
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                  Discover articles and helpful guides about JSON tools and JSON
                  Files in general
                </p>
              </div>
            </div>
          </section>

          <section className="w-full py-4">
            <div className="container px-4 md:px-6" />
          </section>
          <section className="w-full pb-24">
            <div className="container px-4 md:px-6">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {allPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden"
                  >
                    {post.thumbnail ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <ImagePlaceholder />
                    )}

                    <CardHeader className="pt-5">
                      <CardTitle className="text-xl font-semibold">
                        <Link
                          href={`/blog/${post.id}`}
                          className="hover:text-blue-600"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-600 line-clamp-3 mb-6">
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
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="text-gray-500" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {post.authorName}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <time>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                            <span>•</span>
                            <span>{post.readTime}</span>
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
