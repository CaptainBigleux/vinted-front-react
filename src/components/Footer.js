import React from "react";

const Footer = ({ title, darkMode }) => {
  return <footer className={darkMode ? "dark-mode" : ""}>{title}</footer>;
};

export default Footer;
