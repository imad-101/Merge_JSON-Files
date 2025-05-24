import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content");

export interface PostMeta {
  id: string;
  title: string;
  date: string;
  description: string;
  authorName: string;
  authorImage?: string;
  readTime: string;
  thumbnail?: string;
  tags?: string[];
}

export interface PostData extends PostMeta {
  content: string;
}

export function getSortedPostsData(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        id,
        title: data.title || "Untitled Post",
        date: data.date || new Date().toISOString(),
        description: data.description || "",
        authorName: data.authorName || "Anonymous Author",
        authorImage: data.authorImage,
        readTime: data.readTime || "2 min read",
        thumbnail: data.thumbnail,
        tags: data.tags || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostData(id: string): PostData {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${id}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  return {
    id,
    content,
    title: data.title || "Untitled Post",
    date: data.date || new Date().toISOString(),
    description: data.description || "",
    authorName: data.authorName || "Anonymous Author",
    authorImage: data.authorImage,
    readTime: data.readTime || "2 min read",
    thumbnail: data.thumbnail,
    tags: data.tags || [],
  };
}
