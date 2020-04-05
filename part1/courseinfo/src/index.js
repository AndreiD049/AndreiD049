import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{props.course.name}</h1>
);

const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
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

const Total = (props) => {
  return (<p>Number of exercises {props.course.parts.reduce((a, b) => {return a + b.exercises}, 0)}</p>);
};

const App = () => {
  const course = {
    name: "Half stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      }, 
      {
        name: "Using props to pass data",
        exercises: 7
      }, 
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course}/>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);