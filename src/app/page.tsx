import { Suspense } from "react";

import { PostList } from "./components/PostList";

export default async function Home() {
  return (
    <Suspense>
      <PostList />
    </Suspense>
  );
}
