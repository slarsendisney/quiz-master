import React, { useState } from "react";
import { connect } from "react-redux";

const SocketExample = ({ lobby, currentQuestion, phase }) => {
  if (phase <= 1) {
    return (
      <div className="row  pad-20-t pad-20-b is-grey ">
        <div className="col-xs-12">
          <h4 className="is-special-blue">LOBBY</h4>
        </div>
        {lobby
          .sort((a, b) => b.score - a.score)
          .map((item, index) => (
            <div className="col-xs-12" key={item.name}>
              <h4 className="margin-0 margin-2-b">
                {index + 1}.{item.name}{" "}
                {currentQuestion &&
                item.responses[currentQuestion.questionNumber - 1] &&
                item.responses[currentQuestion.questionNumber - 1].response
                  ? "✏️"
                  : ""}{" "}
                - {item.score}
              </h4>
            </div>
          ))}
      </div>
    );
  }
  return <div />;
};

const mapStateToProps = ({ lobby, currentQuestion, phase }) => {
  return { lobby, currentQuestion, phase };
};

const ConnectedSocketExample =
  typeof window !== `undefined`
    ? connect(mapStateToProps, null)(SocketExample)
    : SocketExample;

export default ConnectedSocketExample;
