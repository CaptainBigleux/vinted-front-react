import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SideCart from "../components/SideCart";

import axios from "axios";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  const { _id } = useParams(); // _id

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${_id}`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {!isLoading ? (
        <main className="offer-holder">
          <div className="offer-images-holder">
            {data.product_pictures.map((img, index) => {
              return (
                <div className="offer-images">
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
    </>
  );
};

export default Offer;
