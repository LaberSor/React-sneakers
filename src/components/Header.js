import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './hooks/useCart';
import CartIcon from 'images/cart.svg';
import FavouritesIcon from 'images/favourites.svg';
import UserIcon from 'images/user.svg';
import Logo from 'images/logo.png';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/home">
        <div className="d-flex align-center">
          <img width={40} height={40} src={Logo} className="mr-15" alt="Logo" />

          <div>
            <h3 className="text-uppercase">React-sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img width={18} height={18} src={CartIcon} className="mr-10" alt="Cart" />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to="/favourites">
            <img
              width={18}
              height={18}
              className="cu-p mr-30"
              src={FavouritesIcon}
              alt="Favourites"
            />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} className="cu-p mr-30" src={UserIcon} alt="Orders" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
