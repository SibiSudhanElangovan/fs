import React from 'react';
export default function Feed({ posts, following }) {
  const visiblePosts = posts.filter((post) => following.includes(post.user));
  return <div><div className="section-heading"><h2>Your feed</h2><span>{visiblePosts.length} posts</span></div>
    {visiblePosts.length === 0 ? <p className="muted">No posts from followed users. Follow someone to see their updates.</p> : visiblePosts.map((post) => <article className="post" key={post.id}><div className="post-meta"><strong>@{post.user}</strong><time>{new Date(post.createdAt).toLocaleString()}</time></div><p>{post.content}</p></article>)}
  </div>;
}
