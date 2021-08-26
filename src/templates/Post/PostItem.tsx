import { FC } from "react";
import { format } from "date-fns";

interface PostItemProps {
  title: string;
  description: string;
  createdAt: string;
}

const PostItem: FC<PostItemProps> = ({ title, createdAt, description }) => {
  return (
    <div className="p-6 md:rounded-lg leading-relaxed transition hover:bg-gray-100">
      <strong className="block text-xl md:text-2xl">{title}</strong>
      <time
        className="block mt-1 text-xs md:text-sm text-gray-600"
        dateTime={createdAt}
      >
        {format(new Date(createdAt), "MMMM dd, yyyy")}
      </time>
      <p className="block mt-4 line-clamp-2">{description}</p>
    </div>
  );
};

export default PostItem;
