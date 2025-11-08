import { useState, useEffect } from 'react'
import Names from './components/Names'
import AddNew from './components/AddNew'
import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'
import phonebookService from './services/phonebook'

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
    //console.log([newName, newNumber])
    const normalized = newName.trim().toLowerCase()
    const nameExists = persons.some(person => person.name.trim().toLowerCase() === normalized)
    const numberExists = persons.some(person => person.number === newNumber)
    //console.log(nameExists)
    if (newNumber === '' || newName === ''){
      setMessage('Both name and number are required')
      setNotificationType('error')
      setTimeout(() => {
        setMessage(null)  
        setNotificationType('')
      }, 5000)
    } else {
      if (nameExists) {
        const person = persons.find(person => person.name.trim().toLowerCase() === normalized)
        if (window.confirm(`There is already a contact named ${newName}\nReplace phone number?`)) {
          phonebookService.updatePerson(person.id, { number: newNumber })
            .then(updatedPerson => {
              //console.log(updatedPerson)
              setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
              setFilteredPersons(filteredPersons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
              setMessage(`Updated ${updatedPerson.name}'s number`)
              setNotificationType('success')
            })
            .catch(error => {
              setMessage(`There is no record for ${person.name}`)
              setNotificationType('error')
              setPersons(persons.filter(p => p.id !== person.id))
              setFilteredPersons(filteredPersons.filter(p => p.id !== person.id))
            })
            .finally(() => {
              setNewName('')
              setNewNumber('')
              setTimeout(() => {
                setMessage(null)  
                setNotificationType('')
              }, 5000)
            })
        }
      }
      if (numberExists) {
        setMessage(`The number ${newNumber} is already assigned to another contact`)
        setNotificationType('error')
        setTimeout(() => {
          setMessage(null)
          setNotificationType('')
        }, 5000)
        setNewName('')
        setNewNumber('')
      }
    }
    if (!(newNumber === '' || newName === '') && (!nameExists && !numberExists)) {
      //New person can be added
      const newPerson = { name: newName, number: newNumber }
      phonebookService.createPerson(newPerson)
        .then( addedPerson => {
          // use the object returned by the server (addedPerson) which contains the generated id
          setMessage(`${addedPerson.name} has been added to contacts`)
          setNotificationType('success')
          setPersons(persons.concat(addedPerson))
          setFilteredPersons(filteredPersons.concat(addedPerson))
        })
        .catch( error => {
          setMessage('Something has gone wrong while adding the contact')
          setNotificationType('error')
        })
        .finally( () => {
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
      phonebookService.deletePerson(person.id)
        .then( response => {
          setPersons(persons.filter(p => p.id !== id))
          setFilteredPersons(filteredPersons.filter(p => p.id !== id))
          setMessage(`Deleted ${person.name} from contacts`)
          setNotificationType('success')
          setTimeout(() => {
            setMessage(null)
            setNotificationType('')
          }, 5000)
        })
        .catch( error => {
          setMessage(`Information for ${person.name} has already been removed from server`)
          setNotificationType('error')
          setPersons(persons.filter(p => p.id !== id))
          setFilteredPersons(filteredPersons.filter(p => p.id !== id))
          setTimeout(() => {
            setMessage(null)  
            setNotificationType('')
          }, 5000)
        })
        .finally(() => {
          setPersons(persons.filter(p => p.id !== id))
          setFilteredPersons(filteredPersons.filter(p => p.id !== id))
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