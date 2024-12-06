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
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [addfriend, setaddfriend] = useState(false);

  const [friend, setFriends] = useState(initialFriends);

  function handleAddFriend() {
    setaddfriend((show) => !show);
  }

  function handleAddFriend2(newFriend) {
    setFriends((prevFriends) => [...prevFriends, newFriend]);
    setaddfriend(false);
  }
  function handleSelectedFriend(friend) {
    setSelectedFriend((current) => (current?.id === friend.id ? null : friend));
    setaddfriend(false);
  }

  function handleSplit(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friend}
          onselection={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />

        {addfriend && <FormAddFriend onaddFriend={handleAddFriend2} />}

        <Button onclick={handleAddFriend}>
          {addfriend ? "close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onsplitBill={handleSplit}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onselection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onselection={onselection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onselection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onclick={() => onselection(friend)}>
        {isSelected ? "close" : "select"}
      </Button>
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
      <Button>Add Friend</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onsplitBill }) {
  const [bills, setbills] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const PaidbyFriend = bills ? bills - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSplitBill(e) {
    e.preventDefault();
    if (isNaN(bills) || isNaN(paidByUser)) return;

    onsplitBill(whoIsPaying === "user" ? PaidbyFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>split a bill with {selectedFriend.name}</h2>
      <label>💰 bill value</label>
      <input
        type="text"
        value={bills}
        onChange={(e) => setbills(Number(e.target.value))}
      />

      <label> 🕴 your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => setPaidByUser(Number(e.target.value))}
      />

      <label>👩🏼‍🤝‍🧑🏼 {selectedFriend.name}'s bill</label>
      <input type="text" disabled value={PaidbyFriend} />

      <label>🤑 who's paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">you</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>split bill</Button>
    </form>
  );
}
