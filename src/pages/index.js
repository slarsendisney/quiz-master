import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

import faq from "../data/FAQ.json";

export default function Start() {
  return (
    <Layout>
      <SEO title="Lets get quizzing!" />
      <div className="is-white is-special-blue-bg pad-10-tb pad-3-lr text-align-center">
        <h1 className="is-hero-menu">Welcome to Quiz Master*</h1>
        <p>*Name pending review.</p>
      </div>
      <div className="is-grey is-light-grey-bg pad-10-tb pad-3-lr">
        <div className="row container">
          <div className="col-xs-12">
            <h1>Lets get started...</h1>
          </div>
          <div className="col-xs-12 col-sm-6 text-align-center margin-5-b">
            <Link to="/play">
              <button
                className="is-special-blue-bg is-white pad-3 border-radius grow"
                style={{ width: "100%" }}
              >
                <h1>Join</h1>
              </button>
            </Link>
          </div>
          <div className="col-xs-12 col-sm-6 text-align-center margin-5-b">
            <button
              className="is-grey-bg is-white pad-3 border-radius grow"
              style={{ width: "100%" }}
            >
              <h1>Host</h1>
            </button>
          </div>
        </div>
      </div>
      <div className="is-grey is-white-bg pad-10-tb pad-3-lr">
        <div className="row container">
          <div className="col-xs-12">
            <h1>F.A.Q</h1>
          </div>
          {faq.map((item) => (
            <div className="col-xs-12 col-sm-6">
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="is-grey is-light-grey-bg pad-10-tb pad-3-lr">
        <div className="row container">
          <div className="col-xs-12">
            <h1>Get the code.</h1>
            <p>
              All the code is available on{" "}
              <strong>
                <a
                  href="https://github.com/slarsendisney/quiz-master"
                  className="is-special-blue"
                >
                  Github.
                </a>
              </strong>
            </p>
            <p>Feel free to contribute!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
