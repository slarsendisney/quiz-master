import React from "react";
import Layout from "../components/layout";
import Player from "../components/Player";
import Lobby from "../components/Lobby";
export default function Start() {
  return (
    <Layout>
      <div className="is-white is-light-grey-bg">
        <div className="container-small row">
          <div className="col-xs-12 col-md-9">
            <Player />
          </div>
          <div className="col-xs-12 col-md-3">
            <Lobby />
          </div>
        </div>
      </div>
    </Layout>
  );
}
