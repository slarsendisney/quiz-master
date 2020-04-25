import React from "react";
import { connect } from "react-redux";

const SocketExample = ({
  gameStarted,
  startGame,
  increment,
  currentQuestion,
}) => (
  <div className="row container-small pad-20-t pad-20-b is-grey pad-10-l">
    <div className="col-xs-12">
      <h1>I AM THE MASTER</h1>
    </div>
    <div className="col-xs-12">
      {!gameStarted ? (
        <button className="bubble-button" onClick={startGame}>
          START GAME
        </button>
      ) : (
        <>
          <h4>Current Question</h4>
          <h2>{`${currentQuestion.questionNumber}. ${currentQuestion.question}`}</h2>
          <button className="bubble-button" onClick={increment}>
            Start next question
          </button>
        </>
      )}
    </div>
  </div>
);

const mapStateToProps = ({ gameStarted, currentQuestion }) => {
  return { gameStarted, currentQuestion };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch({ type: "server/start", data: "Start!" }),
    increment: () => dispatch({ type: "server/increment", data: "Start!" }),
  };
};

const ConnectedSocketExample =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(SocketExample)
    : SocketExample;

export default ConnectedSocketExample;
