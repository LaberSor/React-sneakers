import React from 'react';
import AppContext from '../context/Context';

function Info({ imageUrl, title, description }) {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img src={imageUrl} alt="blankCart" className="mb-20" width={120} />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className="greenButton" onClick={() => setCartOpened(false)}>
        <img src="img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
}
export default Info;
