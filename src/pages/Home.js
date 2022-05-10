import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ProductCard from "../components/ProductCard";

import hero from "../assets/img/vinted-hero.jpeg";

const Home = ({
  sortByPrice,
  search,
  priceValues,
  setShowModal,
  isLoggedIn,
}) => {
  const [isLoading, setIsLoading] = useState(true); // used to wait whether axios request is done or not
  const [data, setData] = useState(); // used to store axios request response

  const [page, setPage] = useState(1);
  const [limitPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      //build the query parameters
      const reqQueries = `sort=${sortByPrice}&title=${search}&priceMin=${priceValues[0]}&priceMax=${priceValues[1]}&limit=${limitPerPage}&page=${page}`;

      //axios get request with query params
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?${reqQueries}`
      );
      setData(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
    //refresh the request everytime one of these filter update (bad idea in practice)
  }, [sortByPrice, search, priceValues, page, limitPerPage]);

  // demander a Bastien s'il n'est pas plus judicieux de faire le filtre
  //en front plutot que de faire des requetes en back

  return (
    <main>
      <div className="main-image-holder">
        <img className="main-image" src={hero} alt="vinted main" />
        <div className="main-image-holder-info-card">
          <p>Prêts à faire du tri dans vos placard ?</p>
          <button
            onClick={() => {
              isLoggedIn ? navigate("/publish") : setShowModal("login");
            }}
          >
            Commencer à vendre
          </button>
        </div>
      </div>
      <section className="category-holder">
        <h2>Toutes catégories</h2>
        {!isLoading ? (
          <div className="product-cards-holder">
            {data.map((offer, index) => {
              return <ProductCard key={index} {...offer} />;
            })}
          </div>
        ) : null}
        <div className="pagination">
          <button
            onClick={() => {
              if (page > 1) setPage((prevState) => prevState - 1);
            }}
          >
            Page précédente
          </button>
          <button onClick={() => setPage((prevState) => prevState + 1)}>
            Page suivante
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
