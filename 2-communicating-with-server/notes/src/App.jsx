import { useEffect, useState } from 'react'
import Note from './assets/components/Note'
import Notification from './assets/components/Notification'
import Footer from './assets/components/Footer'
import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: false
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    console.log(`importance of ${note.id} needs to be toggled`)
    console.log(changedNote)

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`the note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleDeleteNote = id => {
    if (window.confirm(`"${notes.find(n => n.id === id).content}" \n\n Are you sure you want to delete this note?`)) {
      noteService
        .deleteNote(id)
        .then(() => {
          setNotes(notes.filter(n => n.id !== id))
        })
        .catch(error => {
          setErrorMessage(`The note: \n\n'${notes.find(n => n.id === id).content}'\n\nwas already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification className='error' message={errorMessage} />
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>   
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all' }
      </button>
      <ul>
        {/* {console.log(notesToShow)} */}
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} deleteNote={handleDeleteNote} />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App 