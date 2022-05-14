import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";

const App = () => {
  const [sortByPrice, setSortByPrice] = useState("price-asc"); //used to sort offers by price ascending or descending
  const [priceValues, setPriceValues] = useState([0, 100]); // used to filter offers by prices
  const [search, setSearch] = useState(""); //used to filter offers by title
  const [showModal, setShowModal] = useState("none"); // state to show modal. 3 "states". none = no modal. "signup" = signup modal. "login" = login modal.

  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("authenticated") || false
  ); //get Cookie to know whether or not user is authenticated. If false then set state to false

  //header => filters components + search + login/signup
  //home => axios get request, links to offers
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
          showModal={showModal}
          setShowModal={setShowModal}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          Cookies={Cookies}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                sortByPrice={sortByPrice}
                search={search}
                priceValues={priceValues}
                setShowModal={setShowModal}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/offer/:id"
            element={
              <Offer isLoggedIn={isLoggedIn} setShowModal={setShowModal} />
            }
          />
          <Route
            path="/publish"
            element={<Publish isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/payment"
            element={<Payment isLoggedIn={isLoggedIn} />}
          />
        </Routes>
        <Footer title="Made by Adrien Callioni" />
      </Router>
    </div>
  );
};

export default App;
