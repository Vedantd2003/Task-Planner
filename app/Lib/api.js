// Simple helpers to interact with mock API routes
export async function fetchBoard(){
  const res = await fetch('/api/board')
  if(!res.ok) throw new Error('Failed')
  return res.json()
}

export async function saveBoard(board){
  const res = await fetch('/api/board', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(board) })
  return res.json()
}

export async function fetchUsers(){
  const res = await fetch('/api/users')
  return res.json()
}
