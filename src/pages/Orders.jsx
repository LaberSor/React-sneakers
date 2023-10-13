import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'components/Card';
import Info from 'components/Info';
import Loader from 'components/Loader';
import { BASE_URL } from 'core/constants/api';
import { toast } from 'react-toastify';
import SadIcon from 'images/sad.svg';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

function Orders() {
  const navigateHistory = useHistory();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BASE_URL}/orders`);
        setOrders(data);
      } catch (err) {
        toast.error('Ошибка при получении заказов');
        console.log(err);
      } finally {
        setIsLoading(false);
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
        {isLoading && <Loader />}
        {!isLoading &&
          orders.length > 0 &&
          orders.map((obj, objIndex) => {
            const total = obj.items.reduce((acc, val) => acc + val.price, 0);
            const date = dayjs(obj.date).format('DD/MM/YYYY');

            return (
              <div key={objIndex} className="d-flex flex-wrap">
                <div className="d-flex flex-column align-center justify-center">
                  <h2>Заказ №{obj.id}</h2>
                  <p className="opacity-6">Сумма заказа: {total} руб.</p>
                  <p className="opacity-6">Дата заказа: {date}</p>
                </div>
                {obj.items.map((item, itemIndex) => (
                  <Card key={itemIndex} disabled {...item} />
                ))}
              </div>
            );
          })}
        {!isLoading && orders.length === 0 && (
          <Info
            imageUrl={SadIcon}
            title="Пусто..."
            description="Оформите хотя бы один заказ"
            buttonTitle="Вернуться на страницу товаров"
            onClose={() => navigateHistory.push('/home')}
            imageWidth={80}
          />
        )}
      </div>
    </div>
  );
}

export default Orders;
