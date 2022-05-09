import React from "react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ isLoggedIn }) => {
  //isLoggedIn contains the token. User is logged in to access publish

  const navigate = useNavigate();

  const [pictures, setPictures] = useState(null); // all the pictures, including the first one

  const [product_name, setProduct_Name] = useState("");
  const [product_description, setProduct_Description] = useState("");
  const [product_price, setProduct_Price] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [exchange, setExchange] = useState(false);
  const [product_image, setProduct_Image] = useState(""); // only the first, "main" picture
  //on my vinted, will need to add product_pictures and send pictures state

  const submitOffer = async () => {
    try {
      const formData = new FormData();
      formData.append("title", product_name);
      formData.append("description", product_description);
      formData.append("price", product_price);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", pictures[0]);
      formData.append("exchange", exchange);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
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

  return (
    <main className="publish-page">
      <div className="publish-holder">
        <h2>Vends ton article</h2>
        <div className="publish-add-picture">
          <input
            type="file"
            className="add-picture-btn"
            onChange={(event) => {
              setPictures(event.target.files);
            }}
          />
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
  );
};

export default Publish;
