import React, { Component } from "react";
import "./App.css";
import BoxClass from "./component/BoxClass";

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

export default class AppClass extends Component {
  constructor() {
    super();
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: "",
      winCount: 0,
      loseCount: 0,
    };
  }
  play = (userChoice) => {
    let computerChoice = this.randomChoice();
    const gameResult = this.judgement(choice[userChoice], computerChoice);

    this.setState((prevState) => ({
      userSelect: choice[userChoice],
      computerSelect: computerChoice,
      result: gameResult,
      winCount:
        gameResult === "win" ? prevState.winCount + 1 : prevState.winCount,
      loseCount:
        gameResult === "lose" ? prevState.loseCount + 1 : prevState.loseCount,
    }));
  };

  randomChoice = () => {
    let itemArray = Object.keys(choice);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };

  judgement = (user, computer) => {
    console.log("user", user, "computer", computer);
    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "Rock")
      return computer.name === "Scissors" ? "win" : "lose";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "win" : "lose";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "win" : "lose";
  };

  resetGame = () => {
    this.setState({
      winCount: 0,
      loseCount: 0,
      userSelect: null,
      computerSelect: null,
      result: "",
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <h1>가위바위보 게임</h1>
          <div className="main">
            <BoxClass
              title="You"
              item={this.state.userSelect}
              result={this.state.result}
            />
            <BoxClass
              title="Computer"
              item={this.state.computerSelect}
              result={this.state.result}
            />
          </div>
          <div className="main">
            <button onClick={() => this.play("scissors")}>가위</button>
            <button onClick={() => this.play("rock")}>바위</button>
            <button onClick={() => this.play("paper")}>보</button>{" "}
          </div>
          <div className="scoreboard">
            <div>
              {this.state.winCount} : {this.state.loseCount}
            </div>
          </div>
          <div className="reset">
            <button onClick={this.resetGame}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}
