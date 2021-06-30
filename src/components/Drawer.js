import React from 'react';
import Info from './Info';
import AppContext from '../context/Context';
import axios from 'axios';


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({onClose, onRemove, items = []}) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const [orderId, setOrderId] = React.useState(false);
  

  const onClickOrder = async () => {
    try {
      setIsloading(true);
      const {data} = await axios.post('https://60d83b626f13520017a681d3.mockapi.io/orders', { items: cartItems });
      
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]); 

      for (let i; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://60d83b626f13520017a681d3.mockapi.io/cart' + item.id);
        await delay(1000);
      }
      
    } catch (err) {
      console.log('Не удалось создать заказ');
    }
    setIsloading(false);
  }

    return (
    <div className="overlay">
        <div className="drawer">
          <h2 className="d-flex justify-between mb-20">Корзина
          <img className="removeBtn" src="/img/btn-remove.svg" alt="Close" onClick={onClose}/></h2>

          {
            items.length > 0 ? (
              <div className="d-flex flex-column flex">
                <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg">
                  </div>  
  
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
  
                  <img 
                      className="removeBtn" 
                      src="/img/btn-remove.svg" 
                      alt="Remove" 
                      onClick={() => onRemove(obj.id)}/>
                </div>))
            }
          </div>

          <div className="cartTotalBlock">
            <ul>
              <li className="d-flex">
                <span>Итого:</span>
                <div></div>
                <b>21 498 руб.</b>
              </li>
              <li className="d-flex">
                <span>Налог 5%:</span>
                <div></div>
                <b>1074 руб.</b>
              </li>
            </ul>
            <button disabled={isloading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
          </div>
              </div>
            ) : (<Info 
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая" }
              description={isOrderComplete? `Ваш заказ №${Number(orderId)} скоро будет передан курьеской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
              imageUrl={isOrderComplete? "/img/complete-order.jpg" :"/img/empty-cart.jpg"}/>)
          }
  
        </div>
    </div>
    )
}

export default Drawer;