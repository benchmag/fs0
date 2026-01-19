const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className="notes">
      {note.content} <br />
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
      <button onClick={() => deleteNote(note.id)}>delete</button>
    </li>
  )
}

export default Note