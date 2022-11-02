import React, { forwardRef } from "react";

const Post = forwardRef(({ post }, ref) => {
  const postBody = (
    <>
      <h2>{post.title}</h2>
      <h2>{post.body}</h2>
      <h2>Post ID: {post.id}</h2>
    </>
  );

  const content = ref ? (
    <article ref={ref}>{postBody}</article>
  ) : (
    <article>{postBody}</article>
  );

  return <div>{content}</div>;
});

export default Post;
