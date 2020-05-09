import React, { useState } from "react";
import { connect } from "react-redux";

const SocketExample = ({ lobby }) => {
  const sortedLobby = lobby.sort((a, b) => b.score - a.score);
  return (
    <div className="row  pad-20-t pad-20-b is-grey ">
      <div className="col-xs-12">
        <h4 className="is-special-blue">Game Complete</h4>
      </div>
      {sortedLobby.map((item, index) => (
        <div className="col-xs-12" key={item.name}>
          <h4 className="margin-0 margin-2-b">
            {index + 1}.{item.name} - {item.score}
          </h4>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ lobby }) => {
  return { lobby };
};

const ConnectedSocketExample =
  typeof window !== `undefined`
    ? connect(mapStateToProps, null)(SocketExample)
    : SocketExample;

export default ConnectedSocketExample;
