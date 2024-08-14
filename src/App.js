import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

const choice = {
  rock: {
    name: "Rock",
    img: "https://cdn-icons-png.flaticon.com/128/1867/1867550.png",
  },
  scissors: {
    name: "Scissors",
    img: "https://cdn-icons-png.flaticon.com/128/3153/3153026.png",
  },
  paper: {
    name: "Paper",
    img: "https://cdn-icons-png.flaticon.com/128/2541/2541988.png",
  },
};

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    const gameResult = judgement(choice[userChoice], computerChoice);
    setResult(gameResult); // 게임 결과 보여주기

    if (gameResult === "win") {
      setWinCount(winCount + 1);
    } else if (gameResult === "lose") {
      setLoseCount(loseCount + 1);
    }
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };

  const judgement = (user, computer) => {
    console.log("user", user, "computer", computer);
    if (user.name == computer.name) {
      return "tie";
    } else if (user.name == "Rock")
      return computer.name == "Scissors" ? "win" : "lose";
    else if (user.name == "Scissors")
      return computer.name == "Paper" ? "win" : "lose";
    else if (user.name == "Paper")
      return computer.name == "Rock" ? "win" : "lose";
  };

  const resetGame = () => {
    setWinCount(0);
    setLoseCount(0);
    setUserSelect(null);
    setComputerSelect(null);
    setResult("");
  };

  return (
    <div>
      <div className="container">
        <div className="main">
          <Box title="You" item={userSelect} result={result} />
          <Box title="Computer" item={computerSelect} result={result} />
        </div>
        <div className="main">
          <button onClick={() => play("scissors")}>가위</button>
          <button onClick={() => play("rock")}>바위</button>
          <button onClick={() => play("paper")}>보</button>{" "}
        </div>
        <div className="scoreboard">
          <div>
            {winCount} : {loseCount}
          </div>
        </div>
        <div className="reset">
          <button onClick={resetGame}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
