import React from "react";

const Course = ({course}) => {
  return (
    <>
    <Header course={course}/>
    <Content course={course}/>
    <Total course={course}/>
    </>
  );
} 

const Header = (props) => (
  <h1>{props.course.name}</h1>
);

const Content = (props) => {
  // courses are stored in @chapters prop
  // we alse have @exerciseCount - array of numbers
  // the length should be the same as in @chapters
  return (
    <>
      {props.course.parts.map((v, i) => {
        return (<Part key={v.name} part={v} />);
      })}
    </>
  );
} 

const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
);

const Total = (props) => {
  return (<p><strong>Number of exercises {props.course.parts.reduce((sum, item) => {return sum + item.exercises}, 0)}</strong></p>);
};

export default Course;