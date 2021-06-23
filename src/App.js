import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <header>
        <div className="headerLeft">
          <img width={40} height={40} src="/img/logo.png" />
          <div className="headerInfo">
            <h3>React-sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>


        <ul className="headerRight">
          <li>
            <svg></svg>
            <span>1205 рублей</span>
          </li>
          <li>
            <svg></svg>
          </li>
        </ul>

      </header>
      <div className="content">
        <h1>Все кроссовки</h1>
      </div>
    </div>
  );
}

export default App;
