import { Metadata } from "next";
import { format } from "date-fns";
import MarkdownPost from "~/app/components/MarkdownPost";
import { github } from "~/utils/client";

export async function generateStaticParams() {
  const posts = await github.issues({ owner: "e2goon", name: "powerjade" });
  return posts.repository?.issues.nodes?.map((post) => ({
    id: String(post?.number),
  }));
}

export async function generateMetadata({ params }) {
  const post = await github.issue({
    number: +params.id,
    owner: "e2goon",
    name: "powerjade",
  });
  if (!post.repository?.issue) return;
  const { title } = post.repository?.issue;
  return { title: `${title} - powerjade.me` };
}

export default async function Post({ params }) {
  const issue = await github.issue({
    number: +params.id,
    owner: "e2goon",
    name: "powerjade",
  });

  const post = issue.repository?.issue;

  if (!post) {
    throw Error("Post not found");
  }

  const { title, body, createdAt } = post;

  return (
    <article>
      <header className="text-center [&~.markdown]:mt-10">
        <h1 className="text-4xl font-bold leading-normal">{title}</h1>
        <time className="text-xs text-zinc-400">
          {format(new Date(createdAt), "MMMM dd, yyyy")}
        </time>
      </header>
      <MarkdownPost content={body} />
    </article>
  );
}
