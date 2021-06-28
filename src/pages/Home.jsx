import Card from '../components/Card';

function Home({
  items,
  searchValue,
  setSearсhValue,
  onChangeSearchInput,
  onAddToFavourite,
  onAddToCart,
  onClickSearchClear,
}) {
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

      <div className="d-flex flex-wrap">
        {items
          .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj) => (
            <Card key={obj} onFavourite={onAddToFavourite} onPlus={onAddToCart} {...obj} />
          ))}
      </div>
    </div>
  );
}

export default Home;
