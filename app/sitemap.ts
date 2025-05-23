import { getSortedPostsData } from "@/lib/posts";

export default async function sitemap() {
  const posts = getSortedPostsData();
  const postUrls = posts.map((post) => ({
    url: `https://merge-json-files.com/blog/${post.id}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: "https://merge-json-files.com/",
      lastModified: new Date(),
    },
    ...postUrls,
    {
      url: "https://merge-json-files.com/json-file-splitter",
      lastModified: new Date(),
    },
    {
      url: "https://merge-json-files.com/blog",
      lastModified: new Date(),
    },
    {
      url: "https://merge-json-files.com/json-flattener",
      lastModified: new Date(),
    },
    {
      url: "https://merge-json-files.com/json-to-jsonl",
      lastModified: new Date(),
    },
    {
      url: "https://merge-json-files.com/jsonl-to-json",
      lastModified: new Date(),
    },
    {
      url: "https://merge-json-files.com/yaml-to-json",
      lastModified: new Date(),
    },
  ];
}
