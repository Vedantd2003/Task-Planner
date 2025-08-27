'use client'
import React from 'react'
import TaskCard from './TaskCard'
import useBoardStore from '../stores/useBoardStore'

export default function Column({ column, tasks }){
  const reorderWithinColumn = useBoardStore(state => state.reorderWithinColumn)
  const moveTask = useBoardStore(state => state.moveTask)

  // Simple HTML5 drag/drop handlers (replace with @dnd-kit later)
  function onDragStart(e, taskId, sourceColId){
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId, sourceColId }))
    e.dataTransfer.effectAllowed = 'move'
  }

  function onDrop(e, destIndex){
    e.preventDefault()
    try {
      const payload = JSON.parse(e.dataTransfer.getData('text/plain'))
      if(!payload) return
      const { taskId, sourceColId } = payload
      if(sourceColId === column.id){
        const startIndex = column.taskIds.indexOf(taskId)
        reorderWithinColumn(column.id, startIndex, destIndex)
      } else {
        moveTask(taskId, sourceColId, column.id, destIndex)
      }
    } catch (err) {
      console.warn('drop error', err)
    }
  }

  function onDragOver(e){ e.preventDefault() }

  return (
    <div className="column">
      <div className="column-header">
        <h3>{column.title} ({tasks.length})</h3>
      </div>
      <div className="task-list" onDragOver={onDragOver} onDrop={(e)=>onDrop(e, tasks.length)}>
        {tasks.map((t, idx) => (
          <div key={t.id} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>onDrop(e, idx)}>
            <div draggable onDragStart={(e)=>onDragStart(e, t.id, column.id)}>
              <TaskCard task={t} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
