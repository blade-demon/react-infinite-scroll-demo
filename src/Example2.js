import React, { useRef, useCallback } from "react";
import { getPostsPage } from "./api/axios";
import { useInfiniteQuery } from "react-query";
import Post from "./Post";

function Example2() {
  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    "/posts",
    ({ pageParam = 1 }) => getPostsPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length + 1 : undefined,
    }
  );

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "error")
    return <p className="center">Error: {error.message}</p>;

  const content = data?.pages.map((page) => {
    return page?.map((post, i) => {
      if (page.length === i + 1) {
        console.log("last element");
        return <Post ref={lastPostRef} key={post.id} post={post} />;
      }

      return <Post key={post.id} post={post} />;
    });
  });

  return (
    <div>
      <h1>Ex.1 React only</h1>
      {content}
      {isFetchingNextPage && <p className="center">Loading more posts...</p>}
      <p className="center">
        <a href="#top">Back to top</a>
      </p>
    </div>
  );
}

export default Example2;
