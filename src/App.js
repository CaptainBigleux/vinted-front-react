import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app-dark" : "app"}>
      <div className={darkMode ? "container dark-mode" : "container"}>
        <Header title="" darkMode={darkMode} setDarkMode={setDarkMode} />

        <Footer title="" darkMode={darkMode} />
      </div>
    </div>
  );
};

export default App;
