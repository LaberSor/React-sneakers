import React from 'react';
import Info from './Info';
import axios from 'axios';
import { useCart } from './hooks/useCart';
import RemoveIcon from 'images/btn-remove.svg';
import ArrowIcon from 'images/arrow.svg';
import CompleteOrderIcon from 'images/complete-order.jpg';
import EmptyCartIcon from 'images/empty-cart.jpg';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const [orderId, setOrderId] = React.useState(false);
  const { cartItems, setCartItems, totalPrice } = useCart();

  const onClickOrder = async () => {
    try {
      setIsloading(true);
      const { data } = await axios.post('https://60d83b626f13520017a681d3.mockapi.io/orders', {
        items: cartItems,
      });

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://60d83b626f13520017a681d3.mockapi.io/cart', item.id);
        await delay(1000);
      }
    } catch (err) {
      console.log('Ошибка при создании заказа');
    }
    setIsloading(false);
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
                    onClick={() => onRemove(obj.id)}
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
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
