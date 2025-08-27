'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

const defaultBoard = {
  columns: [
    { id: 'col-todo', title: 'To Do', taskIds: [] },
    { id: 'col-inprogress', title: 'In Progress', taskIds: [] },
    { id: 'col-done', title: 'Done', taskIds: [] },
  ],
  tasks: {},
  users: [
    { id: 'u1', name: 'Maya', avatar: '/avatars/demo-avatar.png' },
    { id: 'u2', name: 'Sam', avatar: '/avatars/demo-avatar.png' },
  ],
}

export const useBoardStore = create(
  persist(
    (set, get) => ({
      board: defaultBoard,

      /* ---------- Tasks ---------- */
      addTask: (colId, { title, description = '', assigneeId = null, dueDate = null, priority = 'Medium' }) => {
        const id = nanoid()
        set((state) => {
          const tasks = { ...state.board.tasks, [id]: { id, title, description, assigneeId, dueDate, priority, completed: false } }
          const columns = state.board.columns.map((c) =>
            c.id === colId ? { ...c, taskIds: [id, ...c.taskIds] } : c
          )
          return { board: { ...state.board, tasks, columns } }
        })
      },

      editTask: (taskId, updates) => {
        set((state) => {
          if (!state.board.tasks[taskId]) return state
          const tasks = { ...state.board.tasks, [taskId]: { ...state.board.tasks[taskId], ...updates } }
          return { board: { ...state.board, tasks } }
        })
      },

      deleteTask: (taskId) => {
        set((state) => {
          const tasks = { ...state.board.tasks }
          delete tasks[taskId]
          const columns = state.board.columns.map((c) => ({ ...c, taskIds: c.taskIds.filter((id) => id !== taskId) }))
          return { board: { ...state.board, tasks, columns } }
        })
      },

      toggleTaskCompletion: (taskId) => {
        set((state) => {
          if (!state.board.tasks[taskId]) return state
          const task = state.board.tasks[taskId]
          const tasks = { ...state.board.tasks, [taskId]: { ...task, completed: !task.completed } }
          return { board: { ...state.board, tasks } }
        })
      },

      /* ---------- Users ---------- */
      addUser: (name, avatar = '/avatars/demo-avatar.png') => {
        if (!name || !name.trim()) return
        const id = nanoid()
        set((state) => {
          const users = [...state.board.users, { id, name: name.trim(), avatar }]
          return { board: { ...state.board, users } }
        })
      },

      removeUser: (userId) => {
        set((state) => {
          const users = state.board.users.filter((u) => u.id !== userId)
          // unassign tasks assigned to removed user
          const tasks = Object.fromEntries(
            Object.entries(state.board.tasks).map(([k, v]) => [k, v.assigneeId === userId ? { ...v, assigneeId: null } : v])
          )
          return { board: { ...state.board, users, tasks } }
        })
      },

      assignUser: (taskId, userId) => {
        set((state) => {
          if (!state.board.tasks[taskId]) return state
          const tasks = { ...state.board.tasks, [taskId]: { ...state.board.tasks[taskId], assigneeId: userId } }
          return { board: { ...state.board, tasks } }
        })
      },

      /* ---------- Move / reorder ---------- */
      moveTask: (taskId, fromColId, toColId, toIndex = 0) => {
        set((state) => {
          if (fromColId === toColId) return state
          const columns = state.board.columns.map((c) => {
            if (c.id === fromColId) return { ...c, taskIds: c.taskIds.filter((id) => id !== taskId) }
            if (c.id === toColId) {
              const newIds = [...c.taskIds]
              newIds.splice(toIndex, 0, taskId)
              return { ...c, taskIds: newIds }
            }
            return c
          })
          return { board: { ...state.board, columns } }
        })
      },

      reorderWithinColumn: (colId, startIndex, endIndex) => {
        set((state) => {
          const columns = state.board.columns.map((c) => {
            if (c.id !== colId) return c
            const ids = [...c.taskIds]
            const [moved] = ids.splice(startIndex, 1)
            ids.splice(endIndex, 0, moved)
            return { ...c, taskIds: ids }
          })
          return { board: { ...state.board, columns } }
        })
      },

      /* ---------- Server sync (mock API routes) ---------- */
      loadFromServer: async () => {
        try {
          const res = await fetch('/api/board')
          if (!res.ok) throw new Error('Failed to fetch board')
          const data = await res.json()
          // Ensure shape (fallback to defaults if needed)
          set({ board: { ...defaultBoard, ...data } })
          return data
        } catch (e) {
          console.warn('loadFromServer error', e)
          return null
        }
      },

      saveToServer: async () => {
        try {
          const res = await fetch('/api/board', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(get().board),
          })
          if (!res.ok) throw new Error('save failed')
          return await res.json()
        } catch (e) {
          console.warn('saveToServer error', e)
          return null
        }
      },
    }),
    { name: 'trello-board' }
  )
)

export default useBoardStore
