const Totalfull = ({ parts }) => {
    console.log(parts)
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <strong>Total exercises: {total}</strong>
        </div>
    )
}

export default Totalfull