import React from 'react';

function Drawer({onClose, items = []}) {
    return (
    <div className="overlay">
        <div className="drawer">
          <h2 className="d-flex justify-between mb-20">Корзина
          <img className="removeBtn" src="/img/btn-remove.svg" alt="Close" onClick={onClose}/></h2>

          <div className="items">
          { 
           items.map((obj) => (
              <div className="cartItem d-flex align-center mb-20">
                <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg">
                </div>  

                <div className="mr-20 flex">
                  <p className="mb-5">{obj.name}</p>
                  <b>{obj.price} руб.</b>
                </div>

                <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
              </div>
            ))
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
    </div>
    )
}

export default Drawer;