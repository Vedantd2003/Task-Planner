'use client'
import React from 'react'

export default function Navbar(){
  return (
    <header style={{background:'#fff',borderBottom:'1px solid #e6e9ee'}} className="p-4">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1 style={{fontWeight:700}}>Task Planner</h1>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-ghost">Your Boards</button>
          <button className="btn btn-primary">New Board</button>
        </div>
      </div>
    </header>
  )
}
