import { FC } from "react";
import Link from "next/link";
import { usePosts } from "~/hooks";
import PostItem from "./PostItem";

interface PostListProps {}

const PostList: FC<PostListProps> = () => {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {posts.map((post) => (
        <li
          key={post.id}
          className="my-4 md:my-10 md:px-0 first:mt-0 last:mb-0"
        >
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
