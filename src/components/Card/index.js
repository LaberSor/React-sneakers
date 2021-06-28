import React from 'react';
import styles from './Card.module.scss';

function Card({name, imageUrl, price, onFavourite, onPlus}) {

    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavourite, setIsFavourite] = React.useState(false);

    const handleClickPlus = () => {
      onPlus({name, imageUrl, price});
      setIsAdded(!isAdded);
    };

    const handleClickFavourite = () => {
      onFavourite({name, imageUrl, price});
      setIsFavourite(!isFavourite);
    }

    return (
        <div className={styles.card}>
          <div className={styles.favourite}>
          <img 
          src={isFavourite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} 
          alt="Unliked" 
          onClick={handleClickFavourite}/>
          </div>
          <img width={133} height={112} src={imageUrl} alt="Sneaker" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            
              <img 
              className={styles.plus} 
              onClick={handleClickPlus} width={30} height={30} 
              src={isAdded ? "/img/btn-checked.svg" : "/img/plus.svg"} 
              alt="plus"
              />
           
          </div>
        </div>
    )
}

export default Card;