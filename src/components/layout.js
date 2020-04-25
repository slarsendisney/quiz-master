import React from "react";
import PropTypes from "prop-types";
import { Header, Footer } from "sld-component-library";
import Logo from "../images/watermelon.png";

const Layout = ({ children }) => {
  return (
    <>
      <h2 className="margin-1-l">The Ultimate Quiz Tool ⚡️</h2>
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
