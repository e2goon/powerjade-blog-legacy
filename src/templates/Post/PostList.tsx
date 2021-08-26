import { FC } from "react";
import Link from "next/link";
import { usePosts } from "@/hooks";
import PostItem from "./PostItem";

interface PostListProps {}

const PostList: FC<PostListProps> = () => {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-3xl" role="list">
      {posts.map((post) => (
        <div
          className="my-4 first:mt-0 last:mb-0 font-body"
          key={post.id}
          role="listitem"
        >
          <Link href={`/post/${post.number}`} passHref>
            <a className="block">
              <PostItem
                title={post.title}
                createdAt={post.createdAt}
                description={post.bodyText}
              />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
