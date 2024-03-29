import React, { useState, useEffect } from 'react';
import Info from './Info';
import axios from 'axios';
import { useCart } from 'core/hooks/useCart';
import { BASE_URL } from 'core/constants/api';
import delay from '../core/utils/delay';
import RemoveIcon from 'images/btn-remove.svg';
import ArrowIcon from 'images/arrow.svg';
import CompleteOrderIcon from 'images/complete-order.jpg';
import EmptyCartIcon from 'images/empty-cart.jpg';

function Drawer({ onClose, onRemove, items = [] }) {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [orderId, setOrderId] = useState(false);
  const { cartItems, setCartItems, totalPrice } = useCart();

  useEffect(() => {
    const closeDrawer = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeDrawer);

    return () => {
      document.body.style.overflow = 'auto';

      window.removeEventListener('keydown', closeDrawer);
    };
  }, []);

  const onClickOrder = async () => {
    try {
      setIsloading(true);
      const { data } = await axios.post(`${BASE_URL}/orders`, {
        date: new Date().toISOString(),
        items: cartItems,
      });

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`${BASE_URL}/cart/${item.mockId}`, item);
        await delay(1000);
      }
    } catch (err) {
      console.log('Ошибка при создании заказа');
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-20">
          Корзина
          <img className="removeBtn" src={RemoveIcon} alt="Close" onClick={onClose} />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map(obj => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>

                  <img
                    className="removeBtn"
                    src={RemoveIcon}
                    alt="Remove"
                    onClick={() => onRemove(obj.mockId)}
                  />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб.</b>
                </li>
              </ul>
              <button disabled={isloading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src={ArrowIcon} alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ №${Number(orderId)} скоро будет передан курьеской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            imageUrl={isOrderComplete ? CompleteOrderIcon : EmptyCartIcon}
            buttonTitle="Вернуться назад"
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
