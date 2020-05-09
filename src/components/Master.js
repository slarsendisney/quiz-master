import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Podium from "./Podium";

const SocketExample = ({
  gameStarted,
  startGame,
  increment,
  currentQuestion,
  phase,
  timeUp,
  lobby,
  submitMarks,
}) => {
  const [answered, setAnswered] = useState([]);
  const [failedToAnswer, setFailedToAnswer] = useState([]);
  useEffect(() => {
    setAnswered(
      lobby.filter(
        (person) => person.responses[currentQuestion.questionNumber - 1]
      )
    );
    setFailedToAnswer(
      lobby.filter(
        (person) => !person.responses[currentQuestion.questionNumber - 1]
      )
    );
  }, [lobby]);
  console.log({ answered, failedToAnswer, lobby });
  const setCorrect = (index, isCorrect) => {
    let newAnswered = [...answered];
    newAnswered[index].responses[
      currentQuestion.questionNumber - 1
    ].correct = isCorrect;
    setAnswered(newAnswered);
  };
  const completedForm = answered.every(
    (person) =>
      person.responses[currentQuestion.questionNumber - 1] &&
      typeof person.responses[currentQuestion.questionNumber - 1].correct !==
        "undefined"
  );
  const startNextQuestion = () => {
    submitMarks([...answered, ...failedToAnswer]);
    increment();
  };
  return (
    <div className="row is-grey pad-10-tb pad-3-lr">
      <div className="col-xs-12">
        {!gameStarted ? (
          <>
            <h1 className="margin-0 margin-5-b">
              When you're lobby has everyone in it, start the game!
            </h1>
            <button className="bubble-button border-radius" onClick={startGame}>
              START GAME
            </button>
          </>
        ) : (
          <>
            {phase === 0 && (
              <>
                <h4>Current Question</h4>
                <h2>{`${currentQuestion.questionNumber}. ${currentQuestion.question}`}</h2>
                <button className="bubble-button" onClick={timeUp}>
                  End current question
                </button>
              </>
            )}
            {phase === 1 && (
              <>
                <h2>Submissions:</h2>
                {answered.length === 0 && (
                  <div className="row is-white-bg border-radius pad-5-lr pad-2-tb margin-5-b">
                    <h3>No submissions 😢 </h3>
                  </div>
                )}
                {answered.map((person, index) => (
                  <>
                    <div className="row pad-3-lr">
                      <div className="col-xs-4">
                        <h4>Name</h4>
                      </div>
                      <div className="col-xs-4">
                        <h4>Answer</h4>
                      </div>
                      <div className="col-xs-4">
                        <h4>Correct?</h4>
                      </div>
                    </div>
                    <div className="row is-white-bg border-radius pad-5-lr pad-2-tb margin-5-b">
                      <div className="col-xs-4 flex align-horizontal">
                        <h4>
                          <strong>{person.name}</strong>
                        </h4>
                      </div>
                      <div className="col-xs-4 flex align-horizontal">
                        <h4>
                          {
                            person.responses[currentQuestion.questionNumber - 1]
                              .response
                          }
                        </h4>
                      </div>
                      <div className="col-xs-4 flex align-horizontal">
                        {typeof person.responses[
                          currentQuestion.questionNumber - 1
                        ].correct === "undefined" ? (
                          <div>
                            <button
                              className="btn pad-2 border-radius is-green-bg margin-1-r"
                              onClick={() => setCorrect(index, true)}
                            >
                              True
                            </button>
                            <button
                              className="btn pad-2 border-radius is-pink-bg"
                              onClick={() => setCorrect(index, false)}
                            >
                              False
                            </button>
                          </div>
                        ) : (
                          <h4>
                            {person.responses[
                              currentQuestion.questionNumber - 1
                            ].correct
                              ? "✅"
                              : "🚫"}
                          </h4>
                        )}
                      </div>
                    </div>
                  </>
                ))}

                <h2>Failed to answer:</h2>
                <h4>
                  {failedToAnswer.map((person) => person.name).join(", ")}
                  💔
                </h4>

                {completedForm && (
                  <button
                    className="bubble-button border-radius"
                    onClick={startNextQuestion}
                  >
                    Start next question
                  </button>
                )}
              </>
            )}
            {phase === 2 && (
              <>
                <h1>Quiz Complete!</h1>
                <Podium />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ gameStarted, currentQuestion, phase, lobby }) => {
  return { gameStarted, currentQuestion, phase, lobby };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch({ type: "server/start", data: "Start!" }),
    increment: () => dispatch({ type: "server/increment", data: "Start!" }),
    timeUp: () => dispatch({ type: "server/timeup", data: "Start!" }),
    submitMarks: (lobby) =>
      dispatch({ type: "server/submitMarks", data: lobby }),
  };
};

const ConnectedSocketExample =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(SocketExample)
    : SocketExample;

export default ConnectedSocketExample;
