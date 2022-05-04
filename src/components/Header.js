import React from "react";

const Header = ({ title, darkMode, setDarkMode }) => {
  return (
    <header className={darkMode ? "dark-mode" : ""}>
      <>{title}</>
      <>
        <button
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          Dark Mode
        </button>
      </>
    </header>
  );
};

export default Header;
