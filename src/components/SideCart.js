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
  //TODO create function to refactor
  return (
    <aside className="side-cart">
      <p className="side-cart-product-price">{product_price} €</p>
      <div className="side-cart-product-desc-first-part">
        <p className="side-cart-product-desc-item">
          <span>MARQUE</span>
          <span>
            {product_details.find((el) => el.MARQUE) ? (
              <>{product_details.find((el) => el.MARQUE).MARQUE}</>
            ) : null}
          </span>
        </p>
        <p className="side-cart-product-desc-item">
          <span>TAILLE</span>
          <span>
            {product_details.find((el) => el.TAILLE) ? (
              <>{product_details.find((el) => el.TAILLE).TAILLE}</>
            ) : null}
          </span>
        </p>
        <p className="side-cart-product-desc-item">
          <span>ÉTAT</span>
          <span>
            {product_details.find((el) => el.ÉTAT) ? (
              <>{product_details.find((el) => el.ÉTAT).ÉTAT}</>
            ) : null}
          </span>
        </p>
        <p className="side-cart-product-desc-item">
          <span>COULEUR</span>
          <span>
            {product_details.find((el) => el.COULEUR) ? (
              <>{product_details.find((el) => el.COULEUR).COULEUR}</>
            ) : null}
          </span>
        </p>
        <p className="side-cart-product-desc-item">
          <span>EMPLACEMENT</span>
          <span>
            {product_details.find((el) => el.EMPLACEMENT) ? (
              <>{product_details.find((el) => el.EMPLACEMENT).EMPLACEMENT}</>
            ) : null}
          </span>
        </p>
        <p className="side-cart-product-desc-item">
          <span>MODES DE PAIEMENT</span>
          <span>
            {product_details.find((el) => el["MODES DE PAIEMENT"]) ? (
              <>
                {
                  product_details.find((el) => el["MODES DE PAIEMENT"])[
                    "MODES DE PAIEMENT"
                  ]
                }
              </>
            ) : null}
          </span>
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
