import React, { useState } from 'react';
export default function PostForm({ onPost }) {
  const [content, setContent] = useState('');
  const handleSubmit = (event) => { event.preventDefault(); const trimmed = content.trim(); if (!trimmed) return; onPost(trimmed); setContent(''); };
  return <form onSubmit={handleSubmit}><h2>Create a post</h2><textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="What's happening?" rows="3" maxLength="280" required /><div className="form-footer"><span>{content.length}/280</span><button type="submit" disabled={!content.trim()}>Post</button></div></form>;
}
