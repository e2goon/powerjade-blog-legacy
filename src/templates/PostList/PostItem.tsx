import { FC } from "react";

interface PostItemProps {
  title: string;
  description: string;
}

const PostItem: FC<PostItemProps> = ({ title, description }) => {
  return (
    <div className="p-6 ring-1 ring-inset ring-gray-300 rounded-lg">
      <strong className="block text-xl">{title}</strong>
      <p className="block mt-4 line-clamp-2">{description}</p>
    </div>
  );
};

export default PostItem;
