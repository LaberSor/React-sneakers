import Card from '../components/Card';

function Favourites({ items = [], onAddToFavourite }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {items.map((obj) => (
          <Card
            key={obj}
            favourited={true}
            onFavourite={onAddToFavourite}
            {...obj}
            /* onPlus={onAddToCart} */
          />
        ))}
      </div>
    </div>
  );
}

export default Favourites;
