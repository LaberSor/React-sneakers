import React, { useContext, useState } from 'react';
import styles from './Card.module.scss';
import AppContext from 'core/context/Context';
import LikedIcon from 'images/heart-liked.svg';
import UnlikedIcon from 'images/heart-unliked.svg';
import CheckedIcon from 'images/btn-checked.svg';
import PlusIcon from 'images/plus.svg';
import CardLoader from './CardLoader';

function Card({
  id,
  name,
  imageUrl,
  price,
  onFavourite,
  onPlus,
  favourited = false,
  added = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(favourited);

  const handleClickPlus = () => {
    onPlus({ name, imageUrl, price, id });
  };

  const handleClickFavourite = () => {
    onFavourite({ name, imageUrl, price, id });
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={styles.card}>
      {loading && !imageUrl ? (
        <CardLoader />
      ) : (
        <>
          <div className={styles.favourite}>
            <img
              src={isFavourite ? LikedIcon : UnlikedIcon}
              alt="Unliked"
              onClick={handleClickFavourite}
            />
          </div>
          <div className={styles.imgWrapper}>
            <img width="100%" height="100%" src={'/' + imageUrl} alt="Sneaker" />
          </div>
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>

            <img
              className={styles.plus}
              onClick={handleClickPlus}
              width={30}
              height={30}
              src={isItemAdded(id) ? CheckedIcon : PlusIcon}
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
