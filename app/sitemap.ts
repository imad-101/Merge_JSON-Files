export default async function sitemap() {
  return [
    {
      url: "https://merge-json-files.com",
      lastModified: new Date(),
    },
    {
      url: "https://merge-json-files/about-us",
      lastModified: new Date(),
    },
    {
      url: "https://merge-json-files.com/terms-of-use",
      lastModified: new Date(),
    },
    {
      url: "https://merge-json-files.com/privacy-policy",
      lastModified: new Date(),
    },
    // Add all other pages dynamically
  ];
}
