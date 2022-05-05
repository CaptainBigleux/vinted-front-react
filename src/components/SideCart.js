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
  return (
    <aside className="side-cart">
      <p className="side-cart-product-price">{product_price} €</p>
      <div className="side-cart-product-desc-first-part">
        {product_details.map((item, index) => {
          const keys = Object.keys(item);
          return (
            <p className="side-cart-product-desc-item" key={index}>
              <span>{keys[0]}</span> : <span>{item[keys[0]]}</span>
            </p>
          );
        })}
      </div>
      <div className="side-cart-product-name-desc-holder">
        <p className="side-cart-product-name">{product_name}</p>
        <p className="side-cart-product-desc">{product_description}</p>
      </div>
      <div className="side-cart-seller-info-holder">
        <span className="side-cart-seller-avatar">
          {owner.account.avatar ? (
            <img src={owner.account.avatar.secure_url} alt="user avatar" />
          ) : null}
        </span>
        <span>{owner.account.username}</span>
      </div>
      <button className="side-cart-buy-btn">Acheter</button>
    </aside>
  );
};

export default SideCart;
