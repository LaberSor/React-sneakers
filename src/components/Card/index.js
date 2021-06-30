import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from '../../context/Context';


function Card({id, name, imageUrl, price, onFavourite, onPlus, favourited = false, added = false, loading = false}) {
    const { isItemAdded } = React.useContext(AppContext);

    const [isFavourite, setIsFavourite] = React.useState(favourited);

    const handleClickPlus = () => {
      onPlus({name, imageUrl, price, id});
    };

    const handleClickFavourite = () => {
      onFavourite({name, imageUrl, price, id});
      setIsFavourite(!isFavourite);
    }

    return (
        <div className={styles.card}>
           {loading ? (<ContentLoader 
            speed={2}
            width={165}
            height={235}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="155" height="155" /> 
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" /> 
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
            <rect x="0" y="234" rx="5" ry="5" width="80" height="25" /> 
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" /> 
            
          </ContentLoader>) : (<><div className={styles.favourite}>
          <img 
          src={isFavourite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} 
          alt="Unliked" 
          onClick={handleClickFavourite}/>
          </div>
          <img width='100%' height={135} src={imageUrl} alt="Sneaker" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            
              <img 
              className={styles.plus} 
              onClick={handleClickPlus} width={30} height={30} 
              src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"} 
              alt="plus"
              />
           
          </div></>)}

        </div>
    )
}

export default Card;

