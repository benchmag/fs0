import Course from "./Course"
import Totalfull from "./Totalfull"

const Courses = ({ courses }) => {
    return (
        <div>
            <h1>Web Development Curriculum</h1>
            <Totalfull parts={courses.flatMap(course => course.parts)} />
            {courses.map(course => (
                <div key={course.id}>
                    <Course course={course} />
                </div>
            ))}
        </div>
    )
}

export default Courses
