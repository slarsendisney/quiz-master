import React, { useState } from "react";
import { connect } from "react-redux";

const Question = ({ question, questionNumber, submission }) => {
  const [questionInput, setQuestionInput] = useState("");
  const onChange = (e) => setQuestionInput(e.target.value);
  return (
    <div className="is-pink-bg border-radius pad-5 row">
      <h2 className="margin-0">{`${questionNumber}. ${question}`}</h2>
      <input
        className="input"
        onChange={onChange}
        value={questionInput}
      ></input>
      <button
        className="bubble-button"
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
}) => {
  const [nameInput, setNameInput] = useState("");

  const onChange = (e) => setNameInput(e.target.value);
  return (
    <div className="row pad-20-t pad-20-b is-grey">
      {!name ? (
        <div className="col-xs-12">
          <h4>Please enter your name:</h4>
          <input
            className="input"
            placeholder="Bob Dylan"
            value={nameInput}
            onChange={onChange}
          ></input>
          <button
            className="bubble-button"
            onClick={() => {
              addToLobby(nameInput);
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="col-xs-12">
          <h2>Hi {name},</h2>
          {!gameStarted ? (
            <h4>Waiting for game to begin...</h4>
          ) : (
            <>
              {!submitted ? (
                <Question {...currentQuestion} submission={submitToServer} />
              ) : (
                <h4>Thanks for your submission!</h4>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ gameStarted, name, currentQuestion, submitted }) => {
  return { gameStarted, name, currentQuestion, submitted };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToLobby: (name) => dispatch({ type: "server/join", data: name }),
    submitToServer: (questionNumber, question) =>
      dispatch({ type: "server/submit", data: { questionNumber, question } }),
  };
};

const ConnectedSocketExample =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(SocketExample)
    : SocketExample;

export default ConnectedSocketExample;
