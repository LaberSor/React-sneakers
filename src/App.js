import 'App.css';
import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import Drawer from 'components/Drawer';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import Home from 'pages/Home';
import Favourites from 'pages/Favourites.jsx';
import AppContext from 'core/context/Context';
import { BASE_URL } from 'core/constants/api';
import Orders from 'pages/Orders';
import { toast } from 'react-toastify';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearсhValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const cartResponse = await axios.get(`${BASE_URL}/cart`);
        const favouritesResponse = await axios.get(`${BASE_URL}/favourites`);
        const itemsResponse = await axios.get(`${BASE_URL}/items`);
        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavourites(favouritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        toast.error('Ошибка');
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async obj => {
    try {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`${BASE_URL}/cart/${obj.id}`, obj);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post(`${BASE_URL}/cart`, obj);
        setCartItems(prev => [...prev, obj]);
      }
    } catch (error) {
      toast.error('Не удалось добавить товар в корзину');
      console.log(error);
    }
  };

  const onAddToFavourite = async obj => {
    try {
      if (favourites.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`${BASE_URL}/${obj.id}`, obj);
        setFavourites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(`${BASE_URL}/favourites`, obj);
        setFavourites(prev => [...prev, data]);
      }
    } catch (error) {
      toast.error('Не удалось добавить в закладки');
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('favourites in useEffect', favourites);
  }, [favourites]);

  const onRemoveItem = async id => {
    try {
      axios.delete(`${BASE_URL}/cart/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.log(error);
      toast.error('Ошибка при удалении товара из корзины');
    }
  };

  const onChangeSearchInput = event => {
    setSearсhValue(event.target.value);
  };

  const onClickSearchClear = () => {
    setSearсhValue('');
  };

  const isItemAdded = id => {
    return cartItems.some(obj => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favourites,
        isItemAdded,
        onAddToFavourite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
        )}
        <Header onClickCart={() => setCartOpened(true)} />

        <Redirect exact from="/" to="/home" />

        <Route path="/favourites" exact>
          <Favourites />
        </Route>

        <Route path="/home" exact>
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
