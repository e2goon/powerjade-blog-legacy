import { FC } from "react";
import { format } from "date-fns";

interface PostItemProps {
  title: string;
  description: string;
  createdAt: string;
}

const PostItem: FC<PostItemProps> = ({ title, createdAt, description }) => {
  return (
    <div className="p-6 leading-relaxed transition bg-zinc-50 rounded-2xl group-hover:bg-zinc-100 group-focus:bg-zinc-100 dark:bg-zinc-900 dark:group-hover:bg-zinc-800 dark:group-focus:bg-zinc-800">
      <strong className="block text-xl md:text-2xl">
        <span className="mr-2">{title}</span>
        <time
          className="inline-block font-normal text-xs text-zinc-600 md:text-sm dark:text-zinc-400"
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
