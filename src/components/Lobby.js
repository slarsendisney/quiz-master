import React, { useState } from "react";
import { connect } from "react-redux";

const SocketExample = ({ lobby, currentQuestion, phase }) => {
  if (phase <= 1) {
    return (
      <div className="row margin-10-tb pad-3  is-grey is-white-bg border-radius">
        <div className="col-xs-12">
          <h1 className="is-special-blue margin-2-b margin-1-t">Lobby</h1>
          <div className="line is-light-grey  margin-2-b"></div>
        </div>
        {lobby
          .sort((a, b) => b.score - a.score)
          .map((item, index) => (
            <>
              <div className="col-xs-8" key={item.name}>
                <h4 className="margin-0 margin-2-b">
                  <strong>{index + 1}.</strong> {item.name}{" "}
                  {currentQuestion &&
                  item.responses[currentQuestion.questionNumber - 1] &&
                  item.responses[currentQuestion.questionNumber - 1].response
                    ? "✏️"
                    : ""}
                </h4>
              </div>
              <div className="col-xs-4 text-align-center">
                <h4 className="margin-0 margin-2-b">
                  <strong>{item.score}</strong>
                </h4>
              </div>
            </>
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
