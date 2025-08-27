let boardState = null

export default function handler(req, res){
  if(req.method === 'GET'){
    if(!boardState){
      boardState = {
        columns: [
          { id: 'col-todo', title: 'To Do', taskIds: [] },
          { id: 'col-inprogress', title: 'In Progress', taskIds: [] },
          { id: 'col-done', title: 'Done', taskIds: [] }
        ],
        tasks: {},
        users: [
          { id: 'u1', name: 'Maya', avatar: '/avatars/demo-avatar.png' },
          { id: 'u2', name: 'Sam', avatar: '/avatars/demo-avatar.png' }
        ]
      }
    }
    return res.status(200).json(boardState)
  }

  if(req.method === 'POST'){
    boardState = req.body
    return res.status(200).json({ ok:true })
  }

  res.status(405).end()
}
