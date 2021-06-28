import './App.css';
import React from 'react';
import Card from './components/Card/';
import Header from './components/Header';
import Drawer from './components/Drawer';


function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearсhValue] = React.useState('');


  React.useEffect(() => 
  {fetch('https://60d83b626f13520017a681d3.mockapi.io/items')
  .then(response => {return response.json()})
  .then(json => {setItems(json)});
  }, [])
  
  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]); 
  };

  const onChangeSearchInput = (event) => {
    setSearсhValue(event.target.value);
  }

  const onClickSearchClear = () => {
    setSearсhValue('');
  }

  return (
  <div className="wrapper clear">  

    {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
    <Header onClickCart={() => setCartOpened(true)} />

    <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
            <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
            <div className="search-block d-flex">
              <img src="/img/search.svg" alt="Search" className="mr-5"/>
              {searchValue && <img className="clear" onClick={onClickSearchClear} src="/img/btn-remove.svg" alt="Clear"/>}
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
            </div>
          </div>

          <div className="d-flex justify-between flex-wrap">
            {
              items.map((obj) => (
              <Card key={obj} 
                    name={obj.name} 
                    price={obj.price} 
                    imageUrl={obj.imageUrl}
                    onClickFavourite={() => console.log('Clicked on favourite')}
                    onClickPlus={onAddToCart}
              />
            ))}
          </div>
    </div>
  </div>
    
  );
}

export default App;
