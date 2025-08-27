'use client'
import Navbar from './components/Navbar.jsx'
import Board from './components/Board.jsx'

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Board />
    </main>
  )
}
