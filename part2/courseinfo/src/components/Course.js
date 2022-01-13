import React from 'react'

const reducer = (previousValue, currentValue) => previousValue + currentValue;

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = (props) => {
  const exercises=props.exercises
  return(
    <p>Number of exercises {exercises.reduce(reducer)}</p>
  ) 
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = (props) => {
  const parts = props.parts

  return (
    <div>
      {parts.map(part =>
        <Part key = {part.name} part={part} />
      )}
    </div>
  )
}

const Course = ({course}) => {
    console.log(course)
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total exercises={course.parts.map(part =>part.exercises)} />
      </div>
    )  
  }
  export default Course