import AppContext from '../../context/Context';
import React from 'react';

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  let totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return { cartItems, setCartItems, totalPrice };
};
