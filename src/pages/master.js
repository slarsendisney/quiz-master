import React from "react";
import Layout from "../components/layout";
import Master from "../components/Master";
import Lobby from "../components/Lobby";
import SEO from "../components/seo";
export default function Start() {
  return (
    <Layout>
      <SEO title="Lets get quizzing!" />
      <div className="is-white is-light-grey-bg">
        <div className="container row">
          <div className="col-xs-12 col-md-9">
            <Master />
          </div>
          <div className="col-xs-12 col-md-3">
            <Lobby />
          </div>
        </div>
      </div>
    </Layout>
  );
}
