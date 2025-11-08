const AddNew = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <>
            <h2>Add new:</h2>
            <form onSubmit={addPerson}>
                <div>
                    <label>name: <input value={newName} onChange={handleNameChange} /> </label><br/>
                    <label>number: <input value={newNumber} onChange={handleNumberChange}/></label>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default AddNew