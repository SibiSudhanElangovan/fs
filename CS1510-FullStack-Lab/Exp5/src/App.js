import React, { useState } from 'react';
import UserList from './components/UserList';
import PostForm from './components/PostForm';
import Feed from './components/Feed';
const users = ['alice', 'bob', 'charlie', 'diana'];
export default function App() {
  const [currentUser] = useState('alice');
  const [posts, setPosts] = useState([
    { id: 1, user: 'bob', content: 'Learning React one component at a time.', createdAt: new Date().toISOString() },
    { id: 2, user: 'charlie', content: 'Hello from the campus coding club!', createdAt: new Date().toISOString() }
  ]);
  const [following, setFollowing] = useState(['bob']);
  const addPost = (content) => setPosts((current) => [{ id: Date.now(), user: currentUser, content, createdAt: new Date().toISOString() }, ...current]);
  const toggleFollow = (user) => setFollowing((current) => current.includes(user) ? current.filter((name) => name !== user) : [...current, user]);
  return <main className="page-shell">
    <header className="app-header"><p className="eyebrow">CS1510 · EXPERIMENT 5</p><h1>MicroBlog</h1><p>Signed in as <strong>@{currentUser}</strong></p></header>
    <section className="panel"><UserList users={users} currentUser={currentUser} following={following} onToggleFollow={toggleFollow} /></section>
    <section className="panel"><PostForm onPost={addPost} /></section>
    <section className="panel"><Feed posts={posts} following={following} /></section>
  </main>;
}
