import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'components/Card';
import Info from 'components/Info';
import AppContext from 'core/context/Context';
import SadIcon from 'images/sad2.svg';

function Favourites() {
  const navigateHistory = useHistory();
  const { favourites, onAddToFavourite, onAddToCart } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favourites.length > 0 ? (
          favourites.map((obj, index) => (
            <Card
              key={index}
              favourited
              onFavourite={onAddToFavourite}
              onPlus={onAddToCart}
              {...obj}
            />
          ))
        ) : (
          <Info
            imageUrl={SadIcon}
            title="Закладок нет"
            description="Вы ничего не добавили"
            buttonTitle="Вернуться на страницу товаров"
            onClose={() => navigateHistory.push('/home')}
            imageWidth={80}
          />
        )}
      </div>
    </div>
  );
}

export default Favourites;
