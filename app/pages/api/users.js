export default function handler(req,res){
  res.status(200).json([
    { id: 'u1', name: 'Maya', avatar: '/avatars/demo-avatar.png' },
    { id: 'u2', name: 'Sam', avatar: '/avatars/demo-avatar.png' }
  ])
}
