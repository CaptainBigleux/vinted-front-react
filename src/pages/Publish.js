import React from "react";

import { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ isLoggedIn }) => {
  //isLoggedIn contains the token. User is logged in to access publish

  const navigate = useNavigate();

  const [product_pictures, setProduct_Pictures] = useState(null); // all the pictures, including the first one

  const [product_name, setProduct_Name] = useState("");
  const [product_description, setProduct_Description] = useState("");
  const [product_price, setProduct_Price] = useState(0);
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [exchange, setExchange] = useState(false);
  //on my vinted, will need to add product_pictures and send pictures state

  const submitOffer = async () => {
    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_price", product_price);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("condition", condition);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("product_image", product_pictures[0]);
      formData.append("exchange", exchange);
      formData.append("product_pictures", product_pictures);
      formData.append("product_pictures_length", product_pictures.length);

      const response = await axios.post(
        "https://vinted-adrien.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${isLoggedIn}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  //check if isLoggedIn because user could have typed the url
  return isLoggedIn ? (
    <main className="publish-page">
      <div className="publish-holder">
        <h2>Vends ton article</h2>
        <div className="publish-add-picture">
          <label className="add-picture-btn">
            + Ajouter une photo
            <input
              type="file"
              hidden
              onChange={(event) => {
                setProduct_Pictures(event.target.files);
              }}
            />
          </label>
        </div>
        <div className="publish-title-desc-holder">
          <div className="publish-inline-flex">
            <span>Titre</span>
            <input
              type="text"
              value={product_name}
              placeholder="ex: Chemise Sézane verte"
              onChange={(event) => setProduct_Name(event.target.value)}
            />
          </div>
          <div className="publish-inline-flex">
            <span>Décris ton article</span>
            <input
              type="text"
              value={product_description}
              placeholder="ex: porté quelquefois, taille correctement"
              onChange={(event) => setProduct_Description(event.target.value)}
            />
          </div>
        </div>
        <div className="publish-add-details-holder">
          <div className="publish-inline-flex">
            <span>Marque</span>
            <input
              type="text"
              value={brand}
              placeholder="ex: Zara"
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>
          <div className="publish-inline-flex">
            <span>Taille</span>
            <input
              type="text"
              value={size}
              placeholder="ex: L / 40 / 12"
              onChange={(event) => setSize(event.target.value)}
            />
          </div>
          <div className="publish-inline-flex">
            <span>Couleur</span>
            <input
              type="text"
              value={color}
              placeholder="ex: Fushia"
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
          <div className="publish-inline-flex">
            <span>Etat</span>
            <input
              type="text"
              value={condition}
              placeholder="Neuf avec étiquette"
              onChange={(event) => setCondition(event.target.value)}
            />
          </div>
          <div className="publish-inline-flex">
            <span>Lieu</span>
            <input
              type="text"
              value={city}
              placeholder="ex: Paris"
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
        </div>
        <div className="publish-price-holder">
          <div className="publish-inline-flex">
            <span>Prix</span>
            <input
              type="text"
              value={product_price}
              placeholder="0.00 €"
              onChange={(event) => setProduct_Price(event.target.value)}
            />
          </div>
          <div className="publish-inline-flex">
            <span></span>
            <div className="publish-inline-flex">
              <input
                type="checkbox"
                value={exchange}
                onChange={() => setExchange((prevState) => !prevState)}
              />
              <span>Je suis intéressé par les échanges</span>
            </div>
          </div>
        </div>
        <button className="publish-btn" onClick={submitOffer}>
          Ajouter
        </button>
      </div>
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default Publish;
