import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SideCart from "../components/SideCart";

import axios from "axios";

const Offer = () => {
  const [data, setData] = useState(); // used to store axios request response
  const [isLoading, setIsLoading] = useState(true); // used to wait whether axios request is done or not

  const { id } = useParams(); // id retrieved when user clicks on a ProductCard. Used to get to the correct offer route

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <main>
      {!isLoading ? (
        <main className="offer-holder">
          <div className="offer-images-holder">
            {data.product_pictures &&
              data.product_pictures.map((img) => {
                return (
                  <div key={img.asset_id} className="offer-images">
                    <img
                      className="offer-image-solo"
                      src={img.secure_url}
                      alt="product"
                    />
                  </div>
                );
              })}
          </div>
          <SideCart {...data} />
        </main>
      ) : null}
    </main>
  );
};

export default Offer;
