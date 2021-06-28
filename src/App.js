import './App.css';
import React from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';


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
  axios.get('https://60d83b626f13520017a681d3.mockapi.io/favourites')
  .then(response => {
    setFavourites(response.data);
  });
  }, [])
  
  const onAddToCart = (obj) => {
    if (favourites.find(item => item.id === obj.id)) {
      axios.delete(`https://60d83b626f13520017a681d3.mockapi.io/cart/${obj.id}`, obj);
      setCartItems((prev) => prev.filter(item => item.id !== obj.id));
    } else {
      axios.post('https://60d83b626f13520017a681d3.mockapi.io/cart', obj)
      setCartItems((prev) => [...prev, obj]);  
    }
  };

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find(item => item.id === obj.id)) {
        axios.delete(`https://60d83b626f13520017a681d3.mockapi.io/favourites/${obj.id}`, obj);
      } else {
        const {data} = await axios.post('https://60d83b626f13520017a681d3.mockapi.io/favourites', obj)
        setFavourites((prev) => [...prev, data]); 
      }
    } catch (error) {
      console.log('Не удалось добавить в закладки')
    }
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

    <Route path="/favourites" exact>
      <Favourites 
        onAddToFavourite={onAddToFavourite}
        items={favourites}
      />
    </Route>

    <Route path="/" exact>
      <Home 
        items={items}
        searchValue={searchValue}
        setSearсhValue={setSearсhValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavourite={onAddToFavourite}
        onAddToCart={onAddToCart}
        onClickSearchClear={onClickSearchClear}
      />
    </Route>
    
  </div>
    
  );
}

export default App;
