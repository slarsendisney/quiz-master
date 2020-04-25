import React, { useState } from "react";
import { connect } from "react-redux";

const SocketExample = ({ lobby }) => {
  return (
    <div className="row  pad-20-t pad-20-b is-grey ">
      <div className="col-xs-12">
        <h4 className="is-special-blue">LOBBY</h4>
      </div>
      {lobby.map((item) => (
        <div className="col-xs-12" key={item.name}>
          <h4>{item.name}</h4>
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
