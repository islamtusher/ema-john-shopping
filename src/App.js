import { Route, Routes } from 'react-router-dom';
import './App.css';

import NotFound from './components/404/NotFound';
import About from './components/about/About';
import Header from './components/Header/Header';
import Inventory from './components/inventory/Inventory';
import Orders from './components/orders/Orders';
import Shop from './components/Shop/Shop';



function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Shop></Shop>}></Route>
        <Route path='/orders' element={<Orders></Orders>}></Route>
        <Route path='/inventory' element={<Inventory></Inventory>}></Route>
        {/* <Route path='/about' element={<About></About>}></Route> */}
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
