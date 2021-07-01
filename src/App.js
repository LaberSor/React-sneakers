import './App.css';
import React from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import AppContext from './context/Context';
import Orders from './pages/Orders';


function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearсhValue] = React.useState('');
  const [favourites, setFavourites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => 
  { 
    async function fetchData () {
      setIsLoading(true);
      const cartResponse = await axios.get('https://60d83b626f13520017a681d3.mockapi.io/cart');
      const favouritesResponse = await axios.get('https://60d83b626f13520017a681d3.mockapi.io/favourites');
      const itemsResponse = await axios.get('https://60d83b626f13520017a681d3.mockapi.io/items');
      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavourites(favouritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, [])
  
  const onAddToCart = (obj) => {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
          axios.delete(`https://60d83b626f13520017a681d3.mockapi.io/cart/${obj.id}`, obj);
          setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
          axios.post('https://60d83b626f13520017a681d3.mockapi.io/cart', obj)
          setCartItems((prev) => [...prev, obj]);}
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
  <AppContext.Provider value={{items, cartItems, favourites, isItemAdded, onAddToFavourite, setCartOpened, setCartItems}}>
    <div className="wrapper clear">  

    {cartOpened && <Drawer 
    items={cartItems} 
    onClose={() => setCartOpened(false)}
    onRemove={onRemoveItem}/>}
    <Header onClickCart={() => setCartOpened(true)} />
    
    <Route path="/favourites" exact>
      <Favourites/>
    </Route>
    
    <Route path="/" exact>
      <Home 
        items={items}
        searchValue={searchValue}
        cartItems={cartItems}
        favourites={favourites}
        setSearсhValue={setSearсhValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavourite={onAddToFavourite}
        onAddToCart={onAddToCart}
        onClickSearchClear={onClickSearchClear}
        isLoading={isLoading}
      />
    </Route>

    <Route path="/orders" exact>
      <Orders />
    </Route>
    
    </div>
  </AppContext.Provider>
    
  );
}

export default App;
