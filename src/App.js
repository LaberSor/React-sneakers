import './App.css';
import React from 'react';
import Card from './components/Card/';
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';


function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearсhValue] = React.useState('');
  const [favourites, setFavourites] = React.useState([]);
  
  React.useEffect(() => 
  {axios.get('https://60d83b626f13520017a681d3.mockapi.io/items')
  .then(response => {
    setItems(response.data);
  });
  axios.get('https://60d83b626f13520017a681d3.mockapi.io/cart')
  .then(response => {
    setCartItems(response.data);
  });
  }, [])
  
  const onAddToCart = (obj) => {
    axios.post('https://60d83b626f13520017a681d3.mockapi.io/cart', obj)
    setCartItems((prev) => [...prev, obj]); 
  };

  const onAddToFavourite = (obj) => {
    axios.post('https://60d83b626f13520017a681d3.mockapi.io/favourites', obj)
    setFavourites((prev) => [...prev, obj]); 
  };

  const onRemoveItem = (id) => {
      axios.delete(`https://60d83b626f13520017a681d3.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearсhValue(event.target.value);
  }

  const onClickSearchClear = () => {
    setSearсhValue('');
  }

  return (
  <div className="wrapper clear">  

    {cartOpened && <Drawer 
    items={cartItems} 
    onClose={() => setCartOpened(false)}
    onRemove={onRemoveItem}/>}
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

          <div className="d-flex flex-wrap">
            {
              items.filter((obj) => obj.name
              .toLowerCase()
              .includes(searchValue.toLowerCase()))
              .map((obj) => (
              <Card key={obj} 
                    name={obj.name} 
                    price={obj.price} 
                    imageUrl={obj.imageUrl}
                    onFavourite={onAddToFavourite}
                    onPlus={onAddToCart}
              />
            ))}
          </div>
    </div>
  </div>
    
  );
}

export default App;
