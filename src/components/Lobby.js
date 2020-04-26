import React, { useState } from "react";
import { connect } from "react-redux";

const SocketExample = ({ lobby, currentQuestion }) => {
  return (
    <div className="row  pad-20-t pad-20-b is-grey ">
      <div className="col-xs-12">
        <h4 className="is-special-blue">LOBBY</h4>
      </div>
      {lobby.map((item) => (
        <div className="col-xs-12" key={item.name}>
          <h4 className="margin-0 margin-2-b">
            {item.name}{" "}
            {currentQuestion &&
            item.responses[currentQuestion.questionNumber - 1] &&
            item.responses[currentQuestion.questionNumber - 1].response
              ? "✏️"
              : ""}
          </h4>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ lobby, currentQuestion }) => {
  return { lobby, currentQuestion };
};

const ConnectedSocketExample =
  typeof window !== `undefined`
    ? connect(mapStateToProps, null)(SocketExample)
    : SocketExample;

export default ConnectedSocketExample;
