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
      const itemFromCart = cartItems.find(item => Number(item.id) === Number(obj.id));
      console.log(itemFromCart);

      if (itemFromCart) {
        await axios.delete(`${BASE_URL}/cart/${itemFromCart.mockId}`, obj);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(`${BASE_URL}/cart`, obj);
        setCartItems(prev => [...prev, data]);
      }
    } catch (error) {
      toast.error('Не удалось добавить товар в корзину');
      console.log(error);
    }
  };

  const onAddToFavourite = async obj => {
    try {
      const itemFromFavourites = favourites.find(item => Number(item.id) === Number(obj.id));

      if (itemFromFavourites) {
        await axios.delete(`${BASE_URL}/favourites/${itemFromFavourites.mockId}`, obj);
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
    console.log('cartItems in useEffect', cartItems);
  }, [cartItems]);

  const onRemoveItem = async mockId => {
    try {
      await axios.delete(`${BASE_URL}/cart/${mockId}`);
      setCartItems(prev => prev.filter(item => item.mockId !== mockId));
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
