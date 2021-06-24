import './App.css';

function App() {
  return (
    <div className="wrapper clear">
      <div className="overlay">
        <div className="drawer">
          <h2 className="d-flex justify-between mb-20">Корзина
          <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" /></h2>

          <div className="items">
          <div className="cartItem d-flex align-center mb-20">
              <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className="cartItemImg">
              </div>  
            <div className="mr-20 flex">
              <p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>

          <div className="cartItem d-flex align-center mb-20">
              <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className="cartItemImg">
              </div>  
            <div className="mr-20 flex">
              <p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>

          <div className="cartItem d-flex align-center mb-20">
              <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className="cartItemImg">
              </div>  
            <div className="mr-20 flex">
              <p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
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

      <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" className="mr-15" alt="Logo"/>
          <div>
            <h3 className="text-uppercase">React-sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>


        <ul className="d-flex">
          <li className="mr-30">
            <img width={18} height={18} src="/img/cart.svg" className="mr-10" alt="Cart"/>
            <span>1205 руб.</span>
          </li>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="User"/>
          </li>
        </ul>

      </header>

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
        <h1>Все кроссовки</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" className="mr-5"/>
          <input placeholder="Поиск..."/>
        </div>
        </div>

        <div className="d-flex justify-between">
        <div className="card">
          <div className="favourite">
          <img src="/img/heart-unliked.svg" alt="Unliked" />
          </div>
          <img width={133} height={112} src="/img/sneakers/1.jpg" alt="Sneaker" />
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>12 999 руб.</b>
            </div>
            <button className="button">
              <img width={20} height={20} src="/img/plus.svg" alt="plus"/>
            </button>
          </div>
          
        </div>

        <div className="card">
          <img width={133} height={112} src="/img/sneakers/1.jpg" alt="Sneaker" />
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>12 999 руб.</b>
            </div>
            <button className="button">
              <img width={20} height={20} src="/img/plus.svg" alt="plus"/>
            </button>
          </div>
          
        </div>

        <div className="card">
          <img width={133} height={112} src="/img/sneakers/1.jpg" alt="Sneaker" />
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>12 999 руб.</b>
            </div>
            <button className="button">
              <img width={20} height={20} src="/img/plus.svg" alt="plus"/>
            </button>
          </div>
          
        </div>

        <div className="card">
          <img width={133} height={112} src="/img/sneakers/1.jpg" alt="Sneaker" />
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>12 999 руб.</b>
            </div>
            <button className="button">
              <img width={20} height={20} src="/img/plus.svg" alt="plus"/>
            </button>
          </div>
          
        </div>
        
        </div>

      </div>
    </div>
  );
}

export default App;
