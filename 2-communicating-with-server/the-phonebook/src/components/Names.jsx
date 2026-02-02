import Button from "./Button"

const Names = ({ people, handleDelete }) => {
    //console.log(people)
    return (
        <>
            <h2>Contacts: </h2>
            <ul key='people'>
                {people.map(person => <li key={person.id}>{person.name}: {person.number} <Button onClick={() => handleDelete(person.id)} text="Delete"/></li>
                )}
            </ul>
        </>
    )
}

export default Names