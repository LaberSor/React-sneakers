import axios from 'axios';
import React from 'react';
import Card from '../components/Card';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://60d83b626f13520017a681d3.mockapi.io/orders');
      setOrders(data.map((obj) => obj.items).flat());
    })();
  }, []);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {[].map((obj, index) => (
          <Card key={index} favourited={true} onFavourite /* ={onAddToFavourite} */ {...obj} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
