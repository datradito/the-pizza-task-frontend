import React, {useState, useEffect} from 'react';
import Footer from './components/Footer';
import Menu from './components/Menu';

const apiURL_EXCHANGE = 'https://api.exchangeratesapi.io/latest?symbols=USD';
const apiURL_MENUS = 'https://the-pizza-task-backend.herokuapp.com/menu';

function App() {
  const [exchange, setExchange] = useState();
  const [menu, setMenu] = useState([])

  useEffect( () => {
    console.log('Fetching exchange data...');
    fetch(apiURL_EXCHANGE)
      .then(res => res.json())
      .then(response => {
        const {rates} = response;
        const USD = rates.USD;
        console.log(rates);
        console.log(USD);
        setExchange(USD)
      })
    console.log('Fetching exchange menu...')
    fetch(apiURL_MENUS)
    .then(res => res.json())
    .then(response => {
      const menu = response;
      console.log(menu);


  })
  return (
    <div>
      <Menu />
      <Footer rate={exchange}/>
    </div>
  );
}

export default App;
