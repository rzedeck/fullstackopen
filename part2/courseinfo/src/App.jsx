const Header1 = ({ title }) => <h1>{title}</h1>
const Header2 = ({ title }) => <h2>{title}</h2>

const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ content }) => <>{content.map(c => <Part key={c.id} part={c} />)}</>

const Course = ({ courses }) => {
  const coursesWithSubtotals = courses.map(course =>{
    const subTotal = course.parts.reduce ((acc, part) => acc + part.exercises, 0)
    return {
      ...course,
      subTotal: subTotal
    }
  })
  
  return (
    <>
      {coursesWithSubtotals.map( course => {
        return (
          <div key={course.id}>
            <Header2 title={course.name} />
            <Content content={course.parts} />
            <Total sum={course.subTotal} />
          </div>
        )
      })}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <Header1 title='Web development curriculum' />
      <Course courses={courses} />
    </>
    
  )
}

export default App