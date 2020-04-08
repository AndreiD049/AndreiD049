import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import "./style.css";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const giveFeedback = (type) => {
    switch(type) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
    }
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <div className="btn_container">
        <Button title="good" className="btn good" handleClick={() => { giveFeedback("good") }}/>
        <Button title="neutral" className="btn neutral" handleClick={() => { giveFeedback("neutral") }}/>
        <Button title="bad" className="btn bad" handleClick={() => { giveFeedback("bad") }}/>
      </div>
      <Statistics metrics={{good, neutral, bad}} />
    </div>
  );
};

const Statistics = ({metrics}) => {
  const all = metrics.good + metrics.neutral + metrics.bad;
  const average = (metrics.good - metrics.bad) / all || 0;
  const positive = metrics.good / all * 100 || 0;

  if (all === 0) {
    return (<div>No feedback given</div>);
  }

  return (
    <div>
      <h3>Statistics</h3>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <Statistic text="good" value={metrics.good}/>
          <Statistic text="neutral" value={metrics.neutral}/>
          <Statistic text="bad" value={metrics.bad}/>
          <Statistic text="all" value={all}/>
          <Statistic text="average" value={Number(average).toFixed(3)}/>
          <Statistic text="positive" value={Number(positive).toFixed(3)}/>
        </tbody>
      </table>
    </div>);
}

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({title, handleClick, ...rest}) => (<button {...rest} onClick={handleClick}>{title}</button>);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
