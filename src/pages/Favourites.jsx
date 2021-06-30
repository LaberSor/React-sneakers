import React from 'react';
import Card from '../components/Card';
import AppContext from '../context/Context';

function Favourites({ /* items = [], */ onAddToFavourite }) {
  const { favourites } = React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favourites.map((obj, index) => (
          <Card
            key={index}
            favourited={true}
            onFavourite={onAddToFavourite}
            {...obj}
            /* onPlus={onAddToCart} */
          />
        ))}
      </div>
    </div>
  );
}

export default Favourites;
