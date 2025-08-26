const Header = (course) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = (info) => {
  return (
    <div>
      <Part data = {[info.p1, info.e2]}/>
      <Part data = {[info.p2, info.e2]}/> 
      <Part data = {[info.p3, info.e3]}/>
    </div>
  )
}

const Part = (info) => {
  return (
    <div>
      <p> {info.data[0]}: {info.data[1]} </p>
    </div>
  )
}

const Total = (info) => {
  return (
    <p>Total number of exercises: {info.e1 + info.e2 + info.e3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name = {course}/>
      <Content p1 = {part1} e1 = {exercises1} p2 = {part2} e2 = {exercises2} p3 = {part3} e3 = {exercises3}/>
      <Total e1 = {exercises1} e2 = {exercises2} e3 = {exercises3}/>
    </div>
  )
}

export default App