const Note = ({ note, onClick }) => {
  return (
    <li onClick={onClick} style={{ cursor: 'pointer' }}>
      {note.content} {note.important ? <strong>(important)</strong> : ''}
    </li>
  )
}

export default Note