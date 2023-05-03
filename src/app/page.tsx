import { Suspense } from "react";
import { PostList } from "./components/PostList";

export default async function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* @ts-expect-error Async Server Component */}
      <PostList />
    </Suspense>
  );
}
