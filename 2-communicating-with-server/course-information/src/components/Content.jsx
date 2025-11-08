import Part from './Part'
import Total from './Total'

const Content = ({ course }) => (
    <>
        {course.parts.map(part => <Part key={part.id} parts={part} />)}
        <Total parts={course.parts} />
    </>
)

export default Content