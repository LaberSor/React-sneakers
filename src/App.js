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
      try {
        setIsLoading(true);
        const [ cartResponse, favouritesResponse, itemsResponse ] = 
         await Promise.all([axios.get('https://60d83b626f13520017a681d3.mockapi.io/cart'), 
                     axios.get('https://60d83b626f13520017a681d3.mockapi.io/favourites'), 
                     axios.get('https://60d83b626f13520017a681d3.mockapi.io/items')]);
        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavourites(favouritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log("Ошибка при загрузке данных");
      }
    }
    fetchData();
  }, [])
  
  const onAddToCart = async (obj) => {
      try {
        const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
        if (findItem) {
          setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
          await axios.delete(`https://60d83b626f13520017a681d3.mockapi.io/cart/${findItem.id}`, obj); 
        } else {
          const {data} = await axios.post('https://60d83b626f13520017a681d3.mockapi.io/cart', obj);
          setCartItems((prev) => [...prev, data]);
        }
      } catch (error) {
          console.log("Ошибка при добавлении в корзину");
      }
  };

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://60d83b626f13520017a681d3.mockapi.io/favourites/${obj.id}`, obj);
        setFavourites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} = await axios.post('https://60d83b626f13520017a681d3.mockapi.io/favourites', obj)
        setFavourites((prev) => [...prev, data]); 
      }
    } catch (error) {
      console.log('Не удалось добавить в закладки')
    }
  };

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://60d83b626f13520017a681d3.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter(item => item.id !== id));
    } catch (error) {
      console.log("Ошибка при удалении из корзины")
    }
  };

  const onChangeSearchInput = (event) => {
    setSearсhValue(event.target.value);
  }

  const onClickSearchClear = () => {
    setSearсhValue('');
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return (
  <AppContext.Provider value={{items, cartItems, favourites, isItemAdded, onAddToFavourite, setCartOpened, setCartItems, onAddToCart}}>
    <div className="wrapper clear">  

    <Drawer 
    items={cartItems} 
    onClose={() => setCartOpened(false)}
    onRemove={onRemoveItem}
    opened={cartOpened}/>

    <Header onClickCart={() => setCartOpened(true)} />
    
    <Route path="/favourites" exact>
      <Favourites/>
    </Route>
    
    <Route path={`${"/" || "/React-sneakers"}`} exact>
      <Home 
        items={items}
        searchValue={searchValue}
        cartItems={cartItems}
        favourites={favourites}
        setSearсhValue={setSearсhValue}
        onChangeSearchInput={onChangeSearchInput}
        onClickSearchClear={onClickSearchClear}
        onAddToFavourite={onAddToFavourite}
        onAddToCart={onAddToCart}
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
