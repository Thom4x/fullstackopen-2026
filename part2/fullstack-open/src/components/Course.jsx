import React from "react"

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Total = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p><strong>Total of {totalExercises} exercises</strong></p>
    )
}

const Course = ({ course }) => {

    return (
        <>
            <h1>Web development curriculum</h1>
            {course.map(c =>
                <div key={c.id}>
                    <Header course={c} />
                    <Content course={c} />
                    <Total course={c} />
                </div>
            )}

        </>
    )
}

export default Course;