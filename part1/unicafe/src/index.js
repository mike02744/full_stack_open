import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (value, setValue) => {
    const handler = () => {
      setValue(value + 1);
    };
    return handler;
  };

  return (
    <div>
      <Feedback />
      <Button text="good" onClick={handleClick(good, setGood)} />
      <Button text="neutral" onClick={handleClick(neutral, setNeutral)} />
      <Button text="bad" onClick={handleClick(bad, setBad)} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + bad + neutral === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text="bad" value={good} />

          <Statistic text="ba" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic
            text="average"
            value={((good - bad) / (good + bad + neutral)).toFixed(2)}
          />
          <Statistic
            text="positive"
            value={((good / (good + bad + neutral)) * 100).toFixed(1) + "%"}
          />
        </tbody>
      </table>
    </>
  );
};
const Feedback = () => {
  return <h1>give feedback</h1>;
};

ReactDOM.render(<App />, document.getElementById("root"));
