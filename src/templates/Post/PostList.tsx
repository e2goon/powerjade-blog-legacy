import { FC } from "react";
import Link from "next/link";
import { usePosts } from "@/hooks";
import PostItem from "./PostItem";

interface PostListProps {}

const PostList: FC<PostListProps> = () => {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="mx-auto max-w-3xl">
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/post/${post.number}`} passHref>
            <a className="block outline-none group">
              <PostItem
                title={post.title}
                createdAt={post.createdAt}
                description={post.bodyText}
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
