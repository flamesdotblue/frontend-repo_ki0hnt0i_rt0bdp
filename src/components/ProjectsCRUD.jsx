import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Edit, Trash2, Check, X, Loader2, Tag as TagIcon } from 'lucide-react';

const API_BASE = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000').replace(/\/$/, '');

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80">
      {children}
    </span>
  );
}

function Field({ label, id, ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-xs font-medium text-white/60">{label}</label>
      <input
        id={id}
        {...props}
        className={`${props.className || ''} rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:bg-white/10`}
      />
    </div>
  );
}

export default function ProjectsCRUD() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', tags: '' });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/projects`);
        const data = await res.json();
        if (!cancelled) setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const createDisabled = useMemo(() => !form.title.trim() || !form.description.trim(), [form]);

  async function handleCreate(e) {
    e.preventDefault();
    if (createDisabled) return;
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      title: form.title.trim(),
      description: form.description.trim(),
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    setItems((prev) => [optimistic, ...prev]);
    setForm({ title: '', description: '', tags: '' });

    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: optimistic.title, description: optimistic.description, tags: optimistic.tags }),
      });
      if (!res.ok) throw new Error('Failed to create');
      const saved = await res.json();
      setItems((prev) => prev.map((it) => (it.id === tempId ? saved : it)));
    } catch (err) {
      console.error(err);
      setItems((prev) => prev.filter((it) => it.id !== tempId));
    }
  }

  function startEdit(id) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, __editing: true, __buffer: { title: it.title, description: it.description, tags: it.tags.join(', ') } } : it)));
  }

  function cancelEdit(id) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, __editing: false, __buffer: undefined } : it)));
  }

  function changeBuffer(id, field, value) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, __buffer: { ...it.__buffer, [field]: value } } : it)));
  }

  async function saveEdit(id) {
    const target = items.find((it) => it.id === id);
    if (!target || !target.__buffer) return;
    const updated = {
      title: target.__buffer.title.trim(),
      description: target.__buffer.description.trim(),
      tags: target.__buffer.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    const prev = target;
    setBusyId(id);
    // optimistic update
    setItems((prevList) => prevList.map((it) => (it.id === id ? { ...it, ...updated, __editing: false, __buffer: undefined } : it)));

    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error('Failed to update');
    } catch (err) {
      console.error(err);
      // rollback
      setItems((prevList) => prevList.map((it) => (it.id === id ? prev : it)));
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id) {
    const snapshot = items;
    setItems((prev) => prev.filter((it) => it.id !== id));
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    } catch (err) {
      console.error(err);
      // rollback
      setItems(snapshot);
    }
  }

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="bg-gradient-to-b from-white via-white to-amber-200/80 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Projects — Create, Edit, and Showcase
        </h2>
        <p className="mt-3 text-white/70">A cheerful, fast workflow with optimistic updates. Add something new and see it instantly.</p>
      </div>

      {/* Create form */}
      <form onSubmit={handleCreate} className="relative mb-8 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-90 [background:radial-gradient(70%_70%_at_20%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="relative grid grid-cols-1 gap-3 md:grid-cols-6">
          <div className="md:col-span-2">
            <Field
              id="title"
              label="Title"
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g., Optimistic Dashboard"
              required
            />
          </div>
          <div className="md:col-span-3">
            <Field
              id="description"
              label="Description"
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Short punchy description"
              required
            />
          </div>
          <div className="md:col-span-1">
            <Field
              id="tags"
              label="Tags (comma-separated)"
              type="text"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              placeholder="React, API"
            />
          </div>
          <div className="md:col-span-6 mt-2 flex justify-end">
            <button
              type="submit"
              disabled={createDisabled}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white to-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_-12px_rgba(251,191,36,0.65)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <Plus className="h-4 w-4" /> Add project
            </button>
          </div>
        </div>
      </form>

      {/* Projects grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-white/70">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading projects...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article key={it.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-5 shadow-2xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-1 bg-[conic-gradient(at_30%_30%,rgba(251,191,36,0.12),rgba(59,130,246,0.12),transparent_60%)]" />
              </div>
              {!it.__editing ? (
                <div className="relative">
                  <div className="mb-4 h-28 w-full overflow-hidden rounded-xl ring-1 ring-inset ring-white/10">
                    <div className="h-full w-full bg-[radial-gradient(60%_60%_at_50%_0%,rgba(251,191,36,0.18),transparent_60%)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{it.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{it.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Array.isArray(it.tags) && it.tags.map((t) => (
                      <Chip key={t}><TagIcon className="mr-1 h-3 w-3 opacity-70" />{t}</Chip>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => startEdit(it.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      <Edit className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => remove(it.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-rose-200 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-rose-300/30"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Field
                    id={`title-${it.id}`}
                    label="Title"
                    type="text"
                    value={it.__buffer?.title || ''}
                    onChange={(e) => changeBuffer(it.id, 'title', e.target.value)}
                  />
                  <div className="mt-3">
                    <Field
                      id={`description-${it.id}`}
                      label="Description"
                      type="text"
                      value={it.__buffer?.description || ''}
                      onChange={(e) => changeBuffer(it.id, 'description', e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <Field
                      id={`tags-${it.id}`}
                      label="Tags (comma-separated)"
                      type="text"
                      value={it.__buffer?.tags || ''}
                      onChange={(e) => changeBuffer(it.id, 'tags', e.target.value)}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => cancelEdit(it.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 transition hover:bg-white/10"
                    >
                      <X className="h-3.5 w-3.5" /> Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(it.id)}
                      disabled={busyId === it.id}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white to-emerald-300 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-[0_10px_30px_-12px_rgba(16,185,129,0.55)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {busyId === it.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />} Save
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
