import React from 'react';
import Card from '../components/Card';

function Home({
  items,
  searchValue,
  favourites,
  onChangeSearchInput,
  onAddToFavourite,
  onAddToCart,
  onClickSearchClear,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(10)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavourite={(obj) => onAddToFavourite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        favourited={favourites.some((obj) => Number(obj.id) === Number(item.id))}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" className="mr-5" />
          {searchValue && (
            <img
              className="clear"
              onClick={onClickSearchClear}
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
