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

export default Course