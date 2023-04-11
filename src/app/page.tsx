import { Metadata } from "next";
import Link from "next/link";
import { github } from "~/utils/client";

export default async function Home() {
  const isDev = process.env.NODE_ENV === "development";
  const issues = await github.issues({
    owner: "e2goon",
    name: "powerjade",
    label: isDev ? ["draft", "published"] : ["published"],
  });
  const posts = issues.repository?.issues.nodes;

  if (!posts) {
    throw Error("Posts not found");
  }

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post?.id}>
          <Link
            href={`/post/${post?.number}`}
            className="hover:underline visited:text-zinc-500 line-clamp-1"
          >
            {post?.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
