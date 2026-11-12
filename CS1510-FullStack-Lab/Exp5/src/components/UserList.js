import React from 'react';
export default function UserList({ users, currentUser, following, onToggleFollow }) {
  return <div><div className="section-heading"><h2>People</h2><span>{following.length} following</span></div><div className="user-grid">
    {users.filter((user) => user !== currentUser).map((user) => <div className="user-row" key={user}><span>@{user}</span><button className={following.includes(user) ? 'secondary' : ''} onClick={() => onToggleFollow(user)}>{following.includes(user) ? 'Unfollow' : 'Follow'}</button></div>)}
  </div></div>;
}
