import React from 'react';

function Drawer({onClose, onRemove, items = []}) {
    return (
    <div className="overlay">
        <div className="drawer">
          <h2 className="d-flex justify-between mb-20">Корзина
          <img className="removeBtn" src="/img/btn-remove.svg" alt="Close" onClick={onClose}/></h2>

          {
            items.length > 0 ? (
              <div>
                <div className="items">
            {items.map((obj) => (
                <div className="cartItem d-flex align-center mb-20">
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
            <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
          </div>
              </div>
            ) : (<div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img src="/img/empty-cart.jpg" alt="blankCart" className="mb-20" width={120} height={120}/>
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
            </p>
            <button className="greenButton" onClick={onClose}>
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>)
          }
  
        </div>
    </div>
    )
}

export default Drawer;