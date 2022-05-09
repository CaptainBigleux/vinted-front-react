import React from "react";

const Publish = () => {
  return (
    <main className="publish-page">
      <div className="publish-holder">
        <h2>Vends ton article</h2>
        <div className="publish-add-picture">Ajouter une photo</div>
        <div className="publish-title-desc-holder">
          <div className="publish-inline-flex">
            <span>Titre</span>
            <input type="text" placeholder="ex: Chemise Sézane verte" />
          </div>
          <div className="publish-inline-flex">
            <span>Décris ton article</span>
            <input
              type="text"
              placeholder="ex: porté quelquefois, taille correctement"
            />
          </div>
        </div>
        <div className="publish-add-details-holder">
          <div className="publish-inline-flex">
            <span>Marque</span>
            <input type="text" placeholder="ex: Zara" />
          </div>
          <div className="publish-inline-flex">
            <span>Taille</span>
            <input type="text" placeholder="ex: L / 40 / 12" />
          </div>
          <div className="publish-inline-flex">
            <span>Couleur</span>
            <input type="text" placeholder="ex: Fushia" />
          </div>
          <div className="publish-inline-flex">
            <span>Etat</span>
            <input type="text" placeholder="Neuf avec étiquette" />
          </div>
          <div className="publish-inline-flex">
            <span>Lieu</span>
            <input type="text" placeholder="ex: Paris" />
          </div>
        </div>
        <div className="publish-price-holder">
          <div className="publish-inline-flex">
            <span>Prix</span>
            <input type="text" placeholder="0.00 €" />
          </div>
          <div className="publish-inline-flex">
            <span></span>
            <div className="publish-inline-flex">
              <input type="checkbox" />
              <span>Je suis intéressé par les échanges</span>
            </div>
          </div>
        </div>
        <button className="publish-btn">Ajouter</button>
      </div>
    </main>
  );
};

export default Publish;
