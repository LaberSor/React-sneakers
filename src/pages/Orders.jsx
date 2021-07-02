import axios from 'axios';
import React from 'react';
import Card from '../components/Card';
/* import AppContext from '../context/Context'; */

function Orders() {
  /* const {} = React.useContext(AppContext); */
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://60d83b626f13520017a681d3.mockapi.io/orders');
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        console.log('Ошибка при загрузке заказов');
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(10)] : orders).map((obj, index) => (
          <Card key={index} loading={isLoading} {...obj} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
