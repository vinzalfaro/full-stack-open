const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  const parts = props.course.parts
  const sum = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
  console.log('total exercises', sum)

  return (
    <strong>total of {sum} exercises</strong>
  )
}

const Content = (props) => {
  console.log('Content props', props)
  const parts = props.course.parts
  console.log('part names:', parts.map(part => part.name))
  console.log('number of exercises in each part:', parts.map(part => part.exercises))

  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Course = (props) => {
  console.log('Course props', props)
  
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App