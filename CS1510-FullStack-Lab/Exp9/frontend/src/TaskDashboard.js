import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const statuses = ['Pending', 'In Progress', 'Completed'];
export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]); const [newTitle, setNewTitle] = useState(''); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [saving, setSaving] = useState(false);
  const fetchTasks = useCallback(async () => { try { setError(''); const response = await axios.get(`${API}/tasks`); setTasks(response.data); } catch (err) { setError(err.response?.data?.message || 'Could not load tasks. Is the backend running?'); } finally { setLoading(false); } }, []);
  useEffect(() => { fetchTasks(); }, [fetchTasks]);
  const addTask = async (event) => { event.preventDefault(); const title = newTitle.trim(); if (!title || saving) return; try { setSaving(true); await axios.post(`${API}/tasks`, { title }); setNewTitle(''); await fetchTasks(); } catch (err) { setError(err.response?.data?.message || 'Could not add task.'); } finally { setSaving(false); } };
  const updateStatus = async (id, status) => { try { await axios.put(`${API}/tasks/${id}`, { status }); await fetchTasks(); } catch (err) { setError(err.response?.data?.message || 'Could not update task.'); } };
  const completed = tasks.filter((task) => task.status === 'Completed').length;
  return <main className="dashboard"><header className="dashboard-header"><p className="eyebrow">CS1510 · EXPERIMENT 9</p><h1>Project Dashboard</h1><p>Plan tasks and keep work moving.</p></header>
    <section className="stats"><div><strong>{tasks.length}</strong><span>Total tasks</span></div><div><strong>{completed}</strong><span>Completed</span></div><div><strong>{tasks.length - completed}</strong><span>Open</span></div></section>
    <section className="panel"><h2>Add a task</h2><form className="task-form" onSubmit={addTask}><input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="New task title" maxLength="120" required/><button disabled={saving || !newTitle.trim()}>{saving ? 'Adding…' : 'Add Task'}</button></form>{error && <p className="error" role="alert">{error}</p>}</section>
    <section className="panel"><div className="list-heading"><h2>Tasks</h2><button className="refresh" onClick={fetchTasks}>Refresh</button></div>{loading ? <p>Loading tasks…</p> : tasks.length === 0 ? <p className="muted">No tasks yet. Add one above.</p> : <div className="task-list">{tasks.map((task) => <article className="task-row" key={task._id}><div><strong>{task.title}</strong><small>{new Date(task.createdAt).toLocaleDateString()}</small></div><select aria-label={`Status for ${task.title}`} value={task.status} onChange={(event) => updateStatus(task._id, event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></article>)}</div>}</section>
  </main>;
}
