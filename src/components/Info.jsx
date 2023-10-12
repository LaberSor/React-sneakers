import React, { useContext } from 'react';
import AppContext from 'core/context/Context';
import Arrow from 'images/arrow.svg';

function Info({ imageUrl, title, description }) {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img src={imageUrl} alt="blankCart" className="mb-20" width={120} />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className="greenButton" onClick={() => setCartOpened(false)}>
        <img src={Arrow} alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
}
export default Info;
