'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [roles, setRoles] = useState<string[]>(['Coach','Work','Family','Side Business']);
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('Coach');

  useEffect(() => {
    const savedTasks = localStorage.getItem('coachfocus_tasks');
    const savedRoles = localStorage.getItem('coachfocus_roles');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedRoles) {
      const parsed = JSON.parse(savedRoles);
      setRoles(parsed);
      if (parsed.length) setRole(parsed[0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('coachfocus_tasks', JSON.stringify(tasks));
    localStorage.setItem('coachfocus_roles', JSON.stringify(roles));
  }, [tasks, roles]);

  const addTask = () => {
    if (!title.trim()) return;
    setTasks([{ id: Date.now(), title, role, doingToday: false, completed: false }, ...tasks]);
    setTitle('');
  };

  const addRole = () => {
    const name = prompt('Role name');
    if (name && name.trim()) setRoles([...roles, name.trim()]);
  };

  const toggle = (id: number, field: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: !t[field] } : t));
  };

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>CoachFocus</h1>
      <p>Focus on what matters today.</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" style={{ flex: 1, minWidth: 200, padding: 10 }} />
        <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: 10 }}>
          {roles.map(r => <option key={r}>{r}</option>)}
        </select>
        <button onClick={addTask}>Add Task</button>
        <button onClick={addRole}>Add Role</button>
      </div>

      <h2>Today</h2>
      {tasks.filter(t => t.doingToday && !t.completed).map(t => (
        <TaskCard key={t.id} task={t} toggle={toggle} />
      ))}

      {roles.map(r => (
        <section key={r} style={{ marginTop: 24 }}>
          <h2>{r}</h2>
          {tasks.filter(t => t.role === r).map(t => (
            <TaskCard key={t.id} task={t} toggle={toggle} />
          ))}
        </section>
      ))}
    </main>
  );
}

function TaskCard({ task, toggle }: any) {
  return (
    <div style={{ background: 'white', border: '1px solid #e5e5e5', borderRadius: 12, padding: 12, marginBottom: 8 }}>
      <div style={{ fontWeight: 600, textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</div>
      <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>{task.role}</div>
      <button onClick={() => toggle(task.id, 'doingToday')} style={{ marginRight: 8 }}>
        {task.doingToday ? 'Remove from Today' : 'Doing Today'}
      </button>
      <button onClick={() => toggle(task.id, 'completed')}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>
    </div>
  );
}
