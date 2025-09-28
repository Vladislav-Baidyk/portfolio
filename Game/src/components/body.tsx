import { Fragment } from "react/jsx-runtime";
import styles from "./body.module.css";
import { use, useState } from "react";
const Paper = () => (
  <div className={styles.containerGame}>
    <h1>PICKED</h1>
    <div className={styles.paperGame}>
      <img src="./public/icon-paper.svg" />
    </div>
  </div>
);
const Rock = () => (
  <div className={styles.containerGame}>
    <h1>PICKED</h1>
    <div className={styles.rockGame}>
      {" "}
      <img src="./public/icon-rock.svg" />
    </div>
  </div>
);
const Scissors = () => (
  <div className={styles.containerGame}>
    <h1>PICKED</h1>
    <div className={styles.scissorsGame}>
      {" "}
      <img src="./public/icon-scissors.svg" />
    </div>
  </div>
);

function Body() {
  const [score, setScore] = useState<number>(0);
  const [rules, setRules] = useState(false);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [enemyChoice, setEnemyChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [showPlayAgainButton, setShowPlayAgainButton] = useState(false);
  const handleClick = (choice: string) => {
    setUserChoice(choice);
    setTimeout(() => {
      const choices = ["paper", "rock", "scissors"];
      const randomIndex = Math.floor(Math.random() * 3);
      const enemyChoice = choices[randomIndex];
      setEnemyChoice(enemyChoice);
      determineWinner(choice, enemyChoice);
      setTimeout(() => setShowPlayAgainButton(true), 1500);
    }, 1000);
    const determineWinner = (user: string, enemy: string) => {
      if (user === enemy) {
        setResult("DRAW");
        return;
      }

      if (
        (user === "paper" && enemy === "rock") ||
        (user === "rock" && enemy === "scissors") ||
        (user === "scissors" && enemy === "paper")
      ) {
        setResult("WIN");
        setScore((prevScore) => prevScore + 1);
      } else {
        setResult("LOSE");
        setScore((prevScore) => Math.max(0, prevScore - 1));
      }
    };
  };
  const showChoice = (choice: string | null) => {
    switch (choice) {
      case "paper":
        return <Paper />;
      case "rock":
        return <Rock />;
      case "scissors":
        return <Scissors />;
      default:
        return null;
    }
  };
  const playAgain = () => {
    setUserChoice(null);
    setEnemyChoice(null);
    setResult(null);
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="./public/logo.svg" />
          <div className={styles.score}>
            <p>
              SCORE
              <br></br>
              <span className={styles.scoreSpan}>{score}</span>
            </p>
          </div>
        </div>
        {userChoice === null ? (
          <div className={styles.gameContainer}>
            <div className={styles.triangle}>
              {" "}
              <img src="./public/bg-triangle.svg" />{" "}
            </div>

            <div onClick={() => handleClick("paper")} className={styles.paper}>
              {" "}
              <img src="./public/icon-paper.svg" />
            </div>

            <div
              onClick={() => handleClick("scissors")}
              className={styles.scissors}
            >
              {" "}
              <img src="./public/icon-scissors.svg" />
            </div>

            <div onClick={() => handleClick("rock")} className={styles.rock}>
              {" "}
              <img src="./public/icon-rock.svg" />
            </div>
          </div>
        ) : (
          <div className={styles.game}>
            <div className={styles.player}>{showChoice(userChoice)}</div>
            {showPlayAgainButton && (
              <div className={styles.playAgain}>
                <h1>{result}</h1>
                <button className={styles.playButton} onClick={playAgain}>
                  PLAY AGAIN
                </button>
              </div>
            )}
            <div className={styles.enemy}>{showChoice(enemyChoice)}</div>
          </div>
        )}

        <div onClick={() => setRules(true)} className={styles.rules}>
          <h1>RULES</h1>
        </div>
        {rules === true ? (
          <div className={styles.rulesShow}>
            <div className={styles.rulesHeader}>
              <div className={styles.rulesHeaderStart}>
                <h1>RULES</h1>
                <img
                  src="./public/icon-close.svg"
                  onClick={() => setRules(false)}
                />
              </div>
              <img className={styles.rulesImg} src="./public/image-rules.svg" />
            </div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
}

export default Body;
