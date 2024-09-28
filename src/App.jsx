import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [dogVoting, setDogVoting] = useState(0);
  const [catVoting, setCatVoting] = useState(0);
  const loadData = async () => {
    const voting = await axios.get("http://localhost:8080/voting");
    console.log('voting', voting)
    setDogVoting(voting.data["dogVoting"]?.['vote'] || 0);
    setCatVoting(voting.data["catVoting"]?.['vote'] || 0);
  };

  const handleVoteDog = async () => {
    const voting = await axios.post("http://localhost:8080/dog");
    setDogVoting(voting.data["dogVoting"]?.['vote'] || 0);
    setCatVoting(voting.data["catVoting"]?.['vote'] || 0);
  };

  const handleVoteCat = async () => {
    const voting = await axios.post("http://localhost:8080/cat");
    setDogVoting(voting.data["dogVoting"]?.['vote'] || 0);
    setCatVoting(voting.data["catVoting"]?.['vote'] || 0);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App h-screen">
      <ul className="flex justify-between h-full">
        <li className="flex-1 flex flex-col justify-center items-center bg-[red]">
          <h1 className="text-3xl font-extrabold">DOG VOTING</h1>
          <h2 className="mt-8">{(dogVoting / (dogVoting + catVoting)) * 100 || 0}%</h2>
          <button
            onClick={() => handleVoteDog()}
            className="border px-8 py-2 mt-2"
          >
            Vote
          </button>
        </li>
        <li className="flex-1 flex flex-col justify-center items-center bg-[blue]">
          <h1 className="text-3xl font-extrabold">CAT VOTING</h1>
          <h2 className="mt-8">{(catVoting / (dogVoting + catVoting)) * 100 || 0}%</h2>
          <button
            onClick={() => handleVoteCat()}
            className="border px-8 py-2 mt-2"
          >
            Vote
          </button>
        </li>
      </ul>
    </div>
  );
}

export default App;
