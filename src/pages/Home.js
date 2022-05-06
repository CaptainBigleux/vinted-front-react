import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";

import hero from "../assets/img/vinted-hero.jpeg";

const Home = ({ sortByPrice, search, priceValues }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const reqQueries = `sort=${sortByPrice}&title=${search}&priceMin=${priceValues[0]}&priceMax=${priceValues[1]}`;

      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?${reqQueries}`
      );
      setData(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, [sortByPrice, search, priceValues]);

  // demander a Bastien s'il n'est pas plus judicieux de faire le filtre
  //en front plutot que de faire des requetes en back

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
