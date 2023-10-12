import AppContext from '../context/Context';
import { useContext } from 'react';

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  let totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return { cartItems, setCartItems, totalPrice };
};
