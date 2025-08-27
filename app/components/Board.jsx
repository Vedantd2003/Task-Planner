'use client'
import React, { useEffect, useState } from 'react'
import Column from './Column'
import NewTaskModal from './NewTaskModal'
import useBoardStore from '../stores/useBoardStore'

export default function Board() {
  const board = useBoardStore((s) => s.board)
  const loadFromServer = useBoardStore((s) => s.loadFromServer)
  const addUser = useBoardStore((s) => s.addUser)

  const [showModal, setShowModal] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  useEffect(() => {
    // guard: only call if the selector returned an actual function
    if (typeof loadFromServer === 'function') {
      loadFromServer()
    }
  }, [loadFromServer])

  if (!board) return <div>Loading...</div>

  function handleAddUser(e) {
    e.preventDefault()
    if (!newUserName.trim()) return
    addUser(newUserName.trim())
    setNewUserName('')
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add Task</button>

        <form onSubmit={handleAddUser} style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            placeholder="Your name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: '1px solid #e6e9ee' }}
          />
          <button type="submit" className="btn btn-primary">Join</button>
        </form>
      </div>

      <div className="board">
        {board.columns.map((col) => (
          <Column key={col.id} column={col} tasks={col.taskIds.map((id) => board.tasks[id])} />
        ))}
      </div>

      {showModal && <NewTaskModal onClose={() => setShowModal(false)} columns={board.columns} users={board.users} />}
    </div>
  )
}
