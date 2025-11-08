import { useState } from 'react'
import Note from './components/Note'

const App = ({ notes: initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes)

  const toggleImportanceOf = (id) => {
    setNotes(notes.map(n => n.id !== id ? n : { ...n, important: !n.important }))
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <Note key={note.id} note={note} onClick={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
    </div>
  )
}

export default App