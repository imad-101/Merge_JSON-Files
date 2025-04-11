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
  authorImage: string;
  readTime: string;
  thumbnail: string;
  tags?: string[];
}

export interface PostData extends PostMeta {
  content: string;
}

// Get sorted post metadata
export function getSortedPostsData(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title || "Untitled Post",
      date: matterResult.data.date || new Date().toISOString(),
      description: matterResult.data.description || "",
      authorName: matterResult.data.authorName || "Anonymous Author",
      authorImage: matterResult.data.authorImage || "",
      readTime: matterResult.data.readTime || "2 min read",
      thumbnail: matterResult.data.thumbnail || "",
      tags: matterResult.data.tags || [],
    };
  });

  return allPostsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get single post data by ID
export function getPostData(id: string): PostData {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      content: matterResult.content,
      title: matterResult.data.title || "Untitled Post",
      date: matterResult.data.date || new Date().toISOString(),
      description: matterResult.data.description || "",
      authorName: matterResult.data.authorName || "Anonymous Author",
      authorImage: matterResult.data.authorImage || "",
      readTime: matterResult.data.readTime || "2 min read",
      thumbnail: matterResult.data.thumbnail || "",
      tags: matterResult.data.tags || [],
    };
  } catch (error) {
    throw new Error(
      `Post with ID "${id}" not found. ${
        error instanceof Error ? error.message : ""
      }`
    );
  }
}
