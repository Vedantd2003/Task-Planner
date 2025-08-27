'use client'
import React, { useState } from 'react'
import useBoardStore from '../stores/useBoardStore'

export default function NewTaskModal({ onClose, columns, users }){
  const addTask = useBoardStore(state => state.addTask)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [colId, setColId] = useState(columns[0].id)
  const [assignee, setAssignee] = useState(users[0]?.id || '')
  const [due, setDue] = useState('')

  function onSubmit(e){
    e.preventDefault()
    addTask(colId, { title, description, assigneeId: assignee || null, dueDate: due || null })
    onClose()
  }

  return (
    <div className="modal">
      <div className="modal-inner">
        <h3>New Task</h3>
        <form onSubmit={onSubmit} style={{display:'flex',flexDirection:'column',gap:8}}>
          <input required placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
          <select value={colId} onChange={(e)=>setColId(e.target.value)}>
            {columns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <select value={assignee} onChange={(e)=>setAssignee(e.target.value)}>
            <option value="">Unassigned</option>
            {users.map(u=> <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <input type="date" value={due} onChange={(e)=>setDue(e.target.value)} />
          <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}
