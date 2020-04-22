import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const App = (props) => {
  const [ selected, setSelected ] = useState(0);
  const [ votes, setVotes ] = useState(new Array(props.anecdotes.length).fill(0));
  const max = Math.max(...votes);
  const anecdoteWithMaxVotes = votes.indexOf(max);

  const handleClick = (e) => {
    setSelected(randomInt(0, props.anecdotes.length - 1));
  }

  const handleVoteClick = (e) => {
    let copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }
  debugger;
  console.log("test");
  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{props.anecdotes[selected]}</p>
        <small>has {votes[selected]} votes</small>
      </div>
      <div>
        <Button text="vote" handleClick={handleVoteClick}/>
        <Button text="next anecdote" handleClick={handleClick}/>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{props.anecdotes[anecdoteWithMaxVotes]}</p>
      </div>
    </div>
  );
}

const Button = ({text, handleClick, ...rest}) => (
  <button {...rest} onClick={handleClick}>{text}</button>
);

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);