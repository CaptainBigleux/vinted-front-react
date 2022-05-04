import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";

import hero from "../assets/img/vinted-hero.jpeg";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main className="main-holder">
      <div className="main-image-holder">
        <img className="main-image" src={hero} alt="vinted main" />
        <div className="main-image-holder-info-card"></div>
      </div>
      <section className="category-holder">
        <h2>CategoryName</h2>
        {!isLoading ? (
          <div className="product-cards-holder">
            {data.map((offer, index) => {
              return <ProductCard key={index} {...offer} />;
            })}
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default Home;
