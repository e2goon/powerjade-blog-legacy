import Link from "next/link";
import { github } from "~/utils/client";

const fetchPostList = async () => {
  const isDev = process.env.NODE_ENV === "development";
  const issues = await github.issues({
    owner: "e2goon",
    name: "powerjade",
    label: isDev ? ["draft", "published"] : ["published"],
  });
  return issues.repository?.issues.nodes;
};

export const PostList = async () => {
  const posts = await fetchPostList();

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
};
