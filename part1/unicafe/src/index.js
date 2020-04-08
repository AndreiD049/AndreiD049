import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [name, setName] = useState("Guest");
  const [age, setAge] = useState(18);
  const [friends, setFriends] = useState([]);
  const [nameInput, setInput] = useState("");

  const handleClick = (val) => () => setAge(age + val);

  const handleInput = (e) => {
    setInput(e.target.value);
    setName(e.target.value);
  }

  const handleAddFriend = (friend) => {
    setFriends(friends.concat(friend));
  }

  const handleClickChangeName = (e) => {
    setInput("");
  }

  return (
    <div>
      <h1>Hello {name}</h1>
      <input type="text" name="name" value={nameInput} placeholder="Change your name" onChange={handleInput}/>
      <button onClick={handleClickChangeName}>Change</button>
      <h3>You are {age} years old.</h3>
      <Accessor age={age}/>
      <button onClick={handleClick(1)}>be older</button>
      <button onClick={handleClick(-1)}>be younger</button>
      <FriendList friends={friends} handleAddFriend={handleAddFriend}/>
    </div>
  );
};

const FriendList = ({friends, handleAddFriend}) => {
  const [addInputValue, setAddInputValue] = useState("");

  const handleInputChange = (e) => {
    setAddInputValue(e.target.value);
  }

  return (
    <div>
      <h3>Your current frient list:</h3>
      <ul>
        {friends.map((friend, idx) => (<li key={idx}>{friend}</li>))}
      </ul>
      <input type="text" value={addInputValue} onChange={handleInputChange} placeholder="Add friend"/>
      <button onClick={
        (e) => { 
          handleAddFriend(addInputValue); 
          setAddInputValue("");
        }
      }>Add</button>
    </div>
  );
}

const Accessor = ({age}) => {
  if (age < 18) {
    return (<h1 style={{backgroundColor: "red"}}>You are too young ({age}). Come back when you are older</h1>);
  }
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
