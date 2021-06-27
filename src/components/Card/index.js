import React from 'react';
import styles from './Card.module.scss';

function Card({name, imageUrl, price, onClickFavourite, onClickPlus}) {

    const [isAdded, setIsAdded] = React.useState(false);
    
    const handleClickPlus = () => {
      onClickPlus({name, imageUrl, price});
      setIsAdded(!isAdded);
    };

    return (
        <div className={styles.card}>
          <div className={styles.favourite}>
          <img src="/img/heart-unliked.svg" alt="Unliked" onClick={onClickFavourite}/>
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