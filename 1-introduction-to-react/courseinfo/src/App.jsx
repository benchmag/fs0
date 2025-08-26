const Content = (data) => {
  console.log(data.content)
  return (
    <div>
      <p>{data.content.parts[0].name}: {data.content.parts[0].exercises}</p>
      <p>{data.content.parts[1].name}: {data.content.parts[1].exercises}</p>
      <p>{data.content.parts[2].name}: {data.content.parts[2].exercises}</p>
    </div>
  )  
}

const Total = (data) => {
  console.log(data.content)
  return (
    <div>
      <p>Total exercises: {data.content.parts[0].exercises + data.content.parts[1].exercises + data.content.parts[2].exercises}</p>
    </div>  
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <Content content = {course}/>
      <Total content = {course}/>

    </div>
  )
}

export default App