import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onclick }) {
  return (
    <button className="button" onClick={onclick}>
      {children}
    </button>
  );
}

export default function App() {
  const [addfriend, setaddfriend] = useState(false);

  const [friend, setFriends] = useState(initialFriends);

  function handleAddFriend() {
    setaddfriend((show) => !show);
  }

  function handleAddFriend2(newFriend) {
    setFriends((prevFriends) => [...prevFriends, newFriend]);
    setaddfriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friend} />
        {addfriend && <FormAddFriend onaddFriend={handleAddFriend2} />}
        <Button onclick={handleAddFriend}>
          {addfriend ? "close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are even</p>}

      <Button>select</Button>
    </li>
  );
}

function FormAddFriend({ onaddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const NewFriend = {
      id,
      name,
      image: `${image}?u=${id}`,

      balance: 0,
    };
    onaddFriend(NewFriend);

    setImage("https://i.pravatar.cc/48");
    setName("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> 👩🏼‍🤝‍🧑🏼friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label> 🌇image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>split a bill with X</h2>
      <label>💰 bill value</label>
      <input type="text" />

      <label> 🕴 your expense</label>
      <input type="text" />

      <label>👩🏼‍🤝‍🧑🏼 X's bill</label>
      <input type="text" disabled />

      <label>🤑 who's paying the bill?</label>
      <select>
        <option value="user">you</option>
        <option value="friend">friend</option>
      </select>
      <Button>split bill</Button>
    </form>
  );
}
