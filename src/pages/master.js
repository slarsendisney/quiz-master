import React from "react";
import Layout from "../components/layout";
import Master from "../components/Master";
import Lobby from "../components/Lobby";
export default function Start() {
  return (
    <Layout>
      <div className="is-light-grey-bg pad-10">
        <div className="col-xs-12 col-md-9">
          <Master />
        </div>
        <div className="col-xs-12 col-md-3">
          <Lobby />
        </div>
      </div>
    </Layout>
  );
}
