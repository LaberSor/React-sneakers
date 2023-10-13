import React, { useContext } from 'react';
import Card from '../components/Card';
import AppContext from 'core/context/Context';

function Favourites() {
  const { favourites, onAddToFavourite, onAddToCart } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favourites.map((obj, index) => (
          <Card
            key={index}
            favourited
            onFavourite={onAddToFavourite}
            onPlus={onAddToCart}
            {...obj}
          />
        ))}
      </div>
    </div>
  );
}

export default Favourites;
