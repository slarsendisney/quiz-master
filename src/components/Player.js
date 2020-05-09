import React, { useState } from "react";
import { connect } from "react-redux";
import Podium from "./Podium";

const Question = ({ question, questionNumber, submission }) => {
  const [questionInput, setQuestionInput] = useState("");
  const onChange = (e) => setQuestionInput(e.target.value);
  return (
    <div className="is-white-bg border-radius pad-5 row">
      <h2 className="margin-0 margin-2-b">{`${questionNumber}. ${question}`}</h2>
      <input
        className="input  margin-2-b"
        onChange={onChange}
        value={questionInput}
      ></input>
      <button
        className="bubble-button border-radius"
        onClick={() => submission(questionNumber, questionInput)}
      >
        Submit
      </button>
    </div>
  );
};
const SocketExample = ({
  gameStarted,
  name,
  setName,
  addToLobby,
  currentQuestion,
  submitted,
  submitToServer,
  phase,
}) => {
  const [nameInput, setNameInput] = useState("");

  const onChange = (e) => setNameInput(e.target.value);
  return (
    <div className="row is-grey pad-10-tb pad-3-lr">
      {!name ? (
        <div className="col-xs-12">
          <h1 className="margin-0 margin-5-b">What's your name?</h1>
          <input
            className="input margin-5-b"
            placeholder="Bob Dylan"
            value={nameInput}
            onChange={onChange}
          />
          <button
            className="bubble-button border-radius "
            onClick={() => {
              if (nameInput !== "") {
                addToLobby(nameInput);
              }
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="col-xs-12">
          {!gameStarted ? (
            <>
              <h1>Hi {name},</h1>
              <h3>Waiting for game to begin...</h3>
            </>
          ) : (
            <>
              {phase === 0 && (
                <>
                  {!submitted ? (
                    <Question
                      {...currentQuestion}
                      submission={submitToServer}
                    />
                  ) : (
                    <>
                      <h2>Thanks for your submission!</h2>
                      <p>
                        We're just waiting for everyone to finish or the master
                        to end the question.
                      </p>
                    </>
                  )}
                </>
              )}
              {phase === 1 && (
                <>
                  <h3>The answer was...</h3>
                  <h1 className="is-hero-menu margin-0">
                    {currentQuestion.answer}
                  </h1>
                  <p>
                    Did you get it right? The master is marking your answer now!
                  </p>
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
      )}
    </div>
  );
};

const mapStateToProps = ({
  gameStarted,
  name,
  currentQuestion,
  submitted,
  phase,
}) => {
  return { gameStarted, name, currentQuestion, submitted, phase };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToLobby: (name) => dispatch({ type: "server/join", data: name }),
    submitToServer: (questionNumber, response) =>
      dispatch({ type: "server/submit", data: { questionNumber, response } }),
  };
};

const ConnectedSocketExample =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(SocketExample)
    : SocketExample;

export default ConnectedSocketExample;
