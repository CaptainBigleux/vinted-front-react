import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  const [sortByPrice, setSortByPrice] = useState("price-asc");
  const [priceValues, setPriceValues] = useState([0, 100]);
  const [search, setSearch] = useState("");

  return (
    <div className="app">
      <Router>
        <Header
          sortByPrice={sortByPrice}
          setSortByPrice={setSortByPrice}
          priceValues={priceValues}
          setPriceValues={setPriceValues}
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                sortByPrice={sortByPrice}
                search={search}
                priceValues={priceValues}
              />
            }
          ></Route>
          <Route path="/offer/:id" element={<Offer />}></Route>
        </Routes>
        <Footer title="Made by Adrien Callioni" />
      </Router>
    </div>
  );
};

export default App;
