import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addContact = (event) => {
    event.preventDefault()

    const isDuplicate = persons.some(person => person.name === newName)

    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const contactObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(contactObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
    setShowAll(false)
  }

  const contactsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input 
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <h2>Add new contact</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input 
                value={newName}
                onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input 
                value={newNumber}
                onChange={handleNumberChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {contactsToShow.map(person =>
          <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App