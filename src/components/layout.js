import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="is-grey is-light-grey-bg">
      <div className="is-white-bg">
        <Link to="/">
          <button className="grow is-grey ">
            <h2 className="pad-3-l">⚡️ Quiz Master</h2>
          </button>
        </Link>
      </div>
      <main>{children}</main>
      <footer className="is-white-bg is-grey pad-2 footer">
        Built with ☕️ by{" "}
        <a href="https://sld.codes/" className="is-special-blue">
          @sld
        </a>{" "}
        &{" "}
        <a
          href="https://github.com/mbanerjeepalmer"
          className="is-special-blue"
        >
          @mbp
        </a>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
