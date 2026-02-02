import { useState, useEffect } from 'react'
import Names from './components/Names'
import AddNew from './components/AddNew'
import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'
import phonebookService from './services/phonebook'
//import { set } from 'mongoose'

const App = () => {

  //console.log(data)
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    phonebookService.getAll().then(initialData => {
      setPersons(initialData)
      setFilteredPersons(initialData)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchFilter = (event) => {
    setSearchName(event.target.value)
    if (event.target.value.trim() === '') {
      setFilteredPersons(persons)
    } else {
      setFilteredPersons(persons.filter(person => 
        person.name.trim().toLowerCase().includes(event.target.value.trim().toLowerCase())))
      //console.log(filteredPersons)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    setSearchName('')
    setFilteredPersons(persons)

    //Check for duplicate names
    const duplicateName = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    const duplicateNumber = persons.some(person => person.number === newNumber)

    if (duplicateName) {
      if (window.confirm(`The name ${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        //Update existing person's number
        const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const updatedPerson = { ...personToUpdate, number: newNumber }
        phonebookService.updatePerson(personToUpdate.id, updatedPerson)        
          .then(returnedPerson => {
            console.log('Updated ', returnedPerson)
            setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
            setFilteredPersons(filteredPersons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
            setMessage(`Updated ${newName}'s number`)
            setNotificationType('success')
          })
          .catch(error => {
            console.log(error.response.data.error)
            setMessage(`Error: ${error.response.data.error}`)
            setNotificationType('error')
          })
         .finally(() => {
          setTimeout(() => {
            setMessage(null)
            setNotificationType('')
          }, 5000)
          setNewName('')
          setNewNumber('')
          return
        })
      }
      
    }

    if (duplicateNumber) {
      alert(`The number ${newNumber} is already added to phonebook`)
      return
    }

    //Add new person
    console.log('Adding new person:', newName, newNumber)

    if (duplicateName === false && duplicateNumber === false) {
      console.log('No duplicates found, proceeding to add new person.')

      phonebookService.createPerson({ name: newName, number: newNumber })
        .then(returnedPerson => {
          console.log('Added ', returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(persons.concat(returnedPerson))
          setMessage(`Added ${newName} to contacts`)
          setNotificationType('success')
        })
        .catch(error => {
          console.log(error.response.data.error)
          setMessage(`Error: ${error.response.data.error}`)
          setNotificationType('error')
        })
        .finally(() => {
          setTimeout(() => {
          setMessage(null)
          setNotificationType('')
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      //Delete person
      console.log('Deleting person with id:', person.id)
      phonebookService.deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setFilteredPersons(filteredPersons.filter(p => p.id !== id))
          setMessage(`Deleted ${person.name} from contacts`)
          setNotificationType('success')
          setTimeout(() => {
            setMessage(null)
            setNotificationType('')
          }, 5000)
        })
        .catch(error => {
          setMessage(`Someting went wrong...`)
          setNotificationType('error')
          setTimeout(() => {
            setMessage(null)
            setNotificationType('')
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter searchFilter={searchName} onChange={handleSearchFilter} />
      <AddNew addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Notification notificationType={notificationType} message={message} />
      <Names people={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App