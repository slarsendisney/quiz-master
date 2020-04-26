import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

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
  }, []);
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
      typeof person.responses[currentQuestion.questionNumber - 1].correct !==
      "undefined"
  );
  const startNextQuestion = () => {
    submitMarks([...answered, ...failedToAnswer]);
    increment();
  };
  return (
    <div className="row container-small pad-20-t pad-20-b is-grey pad-10-l">
      <div className="col-xs-12">
        {!gameStarted ? (
          <button className="bubble-button" onClick={startGame}>
            START GAME
          </button>
        ) : (
          <>
            {phase === 0 ? (
              <>
                <h4>Current Question</h4>
                <h2>{`${currentQuestion.questionNumber}. ${currentQuestion.question}`}</h2>
                <button className="bubble-button" onClick={timeUp}>
                  End current question
                </button>
              </>
            ) : (
              <>
                <h4>Submissions:</h4>
                {answered.map((person, index) => (
                  <div className="flex align-horizontal is-white-bg border-radius pad-5-lr margin-5-b">
                    <h4 className="margin-5-r">
                      {person.name} -{` "`}
                      {
                        person.responses[currentQuestion.questionNumber - 1]
                          .response
                      }
                      {`"`}
                    </h4>
                    {typeof person.responses[currentQuestion.questionNumber - 1]
                      .correct === "undefined" ? (
                      <div>
                        <button
                          className="btn pad-2 border-radius is-green-bg"
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
                        {person.responses[currentQuestion.questionNumber - 1]
                          .correct
                          ? "✅"
                          : "🚫"}
                      </h4>
                    )}
                  </div>
                ))}
                <h4>Failed to answer:</h4>
                {failedToAnswer.map((person) => (
                  <h4>{person.name} 💔</h4>
                ))}
                {completedForm && (
                  <button className="bubble-button" onClick={startNextQuestion}>
                    Start next question
                  </button>
                )}
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
