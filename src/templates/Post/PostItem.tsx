import { FC } from "react";
import { format } from "date-fns";

interface PostItemProps {
  title: string;
  description: string;
  createdAt: string;
}

const PostItem: FC<PostItemProps> = ({ title, createdAt, description }) => {
  return (
    <div className="py-8 px-6 leading-relaxed transition group-hover:bg-gray-100 group-focus:bg-gray-100 md:rounded-lg">
      <strong className="block text-xl md:text-2xl">
        <span className="mr-2">{title}</span>
        <time
          className="font-normal text-xs text-gray-600 md:text-sm"
          dateTime={createdAt}
        >
          {format(new Date(createdAt), "MMMM dd, yyyy")}
        </time>
      </strong>
      <p className="block mt-4 line-clamp-2">{description}</p>
    </div>
  );
};

export default PostItem;
