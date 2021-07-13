import { FC } from "react";

interface PostItemProps {
  title: string;
  description: string;
}

const PostItem: FC<PostItemProps> = ({ title, description }) => {
  return (
    <div className="p-6 ring-1 ring-inset ring-gray-300 rounded-lg">
      <strong className="block">{title}</strong>
      <span className="block mt-2">{description}</span>
    </div>
  );
};

export default PostItem;
