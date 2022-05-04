import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  product_details,
  //   product_pictures,
  _id,
  //   product_name,
  //   product_description,
  product_price,
  //   owner,
  product_image,
  //   product_date,
}) => {
  return (
    <Link to={`offer/${_id}`} className="link-product-card">
      <div className="product-card">
        <img
          className="product-card-image"
          src={product_image.secure_url}
          alt="product"
        />
        <div className="product-card-information">
          <span className="product-card-text-first">
            <span>
              <span>{product_price.toFixed(2)}€</span>
              <button className="product-card-info-btn">i</button>
            </span>
            <button>♡10</button>
          </span>
          {product_details.find((el) => el.TAILLE) ? (
            <p>{product_details.find((el) => el.TAILLE).TAILLE}</p>
          ) : null}
          {product_details.find((el) => el.MARQUE) ? (
            <p>{product_details.find((el) => el.MARQUE).MARQUE}</p>
          ) : null}{" "}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
