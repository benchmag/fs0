const Total = ({ parts }) => {
    console.log(parts)
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <strong>Section exercises: {total}</strong>
        </div>
    )
}

export default Total