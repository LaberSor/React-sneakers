import React from 'react';
import styles from './Card.module.scss';

function Card(props) {

    const [isAdded, setIsAdded] = React.useState(false);
    
    const handleClickPlus = () => {
      setIsAdded(!isAdded);
    };

    return (
        <div className={styles.card}>
          <div className={styles.favourite}>
          <img src="/img/heart-unliked.svg" alt="Unliked" onClick={props.onClickFavourite}/>
          </div>
          <img width={133} height={112} src={props.imageUrl} alt="Sneaker" />
          <h5>{props.name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{props.price} руб.</b>
            </div>
            
              <img className={styles.plus} onClick={handleClickPlus} width={30} height={30} 
              src={isAdded ? "/img/btn-checked.svg" : "/img/plus.svg"} alt="plus"/>
           
          </div>
        </div>
    )
}

export default Card;