import './App.css';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  return (
    <div className="wrapper clear">
      
    <Drawer />
    
    <Header />
      
      <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" className="mr-5"/>
            <input placeholder="Поиск..."/>
          </div>
          </div>

          <div className="d-flex justify-between">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </div>
      </div>
    </div>
    
  );
}

export default App;
