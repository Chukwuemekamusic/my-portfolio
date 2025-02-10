// app/blog/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import BlogList from "@/components/blog-list";

const postsDirectory = path.join(process.cwd(), "posts");

export default function BlogPage() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      // TODO: we have to make the slug unique
      slug: fileName.replace(/\.(md|mdx)$/, ""),
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-12 ">
      <div className="max-w-4xl mx-auto">
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
