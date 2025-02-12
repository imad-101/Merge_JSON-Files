// app/blogs/page.tsx
export default function BlogIndex() {
  const blogs = [
    { title: "How to Merge JSON Files", slug: "how-to-merge-json-files" },
    {
      title: "Advanced JSON Merging Techniques",
      slug: "advanced-json-merging-techniques",
    },
    // Add more blogs here
  ];

  return (
    <div>
      <h1>Blog Tutorials</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <a href={`/blogs/${blog.slug}`}>{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
