import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import Card from '../components/Card';
import AppContext from 'core/context/Context';
import { BASE_URL } from 'core/constants/api';
import { toast } from 'react-toastify';

function Orders() {
  const { onAddToFavourite } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/orders`);
        setOrders(data.map(obj => obj.items).flat());
      } catch (err) {
        toast.error('Ошибка при получении заказов');
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {orders.length > 0 &&
          orders.map((obj, index) => (
            <Card key={index} favourited={true} onFavourite={onAddToFavourite} {...obj} />
          ))}
      </div>
    </div>
  );
}

export default Orders;
