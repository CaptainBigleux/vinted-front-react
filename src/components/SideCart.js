import React from "react";

const SideCart = ({
  product_price,
  product_details,
  product_description,
  product_name,
  owner,
  //   product_date,
  //   _id,
}) => {
  const checkAndAddItem = (elemToCheck) => {
    let elemToReturn;
    {
      product_details.find((el) => el[`${elemToCheck}`])
        ? (elemToReturn = product_details.find((el) => el[`${elemToCheck}`])[
            `${elemToCheck}`
          ])
        : (elemToReturn = null);
    }
    return elemToReturn;
  };
  //TODO create function to refactor
  return (
    <aside className="side-cart">
      <p className="side-cart-product-price">{product_price} €</p>
      <div className="side-cart-product-desc-first-part">
        <p className="side-cart-product-desc-item">
          <span>MARQUE</span>
          <span>{checkAndAddItem("MARQUE")}</span>
        </p>
        <p className="side-cart-product-desc-item">
          <span>TAILLE</span>
          <span>{checkAndAddItem("TAILLE")}</span>
        </p>
        <p className="side-cart-product-desc-item">
          <span>ÉTAT</span>
          <span>{checkAndAddItem("ÉTAT")}</span>
        </p>
        <p className="side-cart-product-desc-item">
          <span>COULEUR</span>
          <span>{checkAndAddItem("COULEUR")}</span>
        </p>
        <p className="side-cart-product-desc-item">
          <span>EMPLACEMENT</span>
          <span>{checkAndAddItem("EMPLACEMENT")}</span>
        </p>
        <p className="side-cart-product-desc-item">
          <span>MODES DE PAIEMENT</span>
          <span>{checkAndAddItem("MODES DE PAIEMENT")}</span>
        </p>
      </div>
      <div className="side-cart-product-name-desc-holder">
        <p className="side-cart-product-name">{product_name}</p>
        <p className="side-cart-product-desc">{product_description}</p>
      </div>
      <div className="side-cart-seller-info-holder">
        <span className="side-cart-seller-avatar">
          {owner.account.avatar ? (
            <img src={owner.account.avatar.secure_url} />
          ) : null}
        </span>
        <span>{owner.account.username}</span>
      </div>
      <button className="side-cart-buy-btn">Acheter</button>
    </aside>
  );
};

export default SideCart;
