import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductsList from './Pages/ProductsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import Category from './Pages/Category';
import Users from './Pages/Users';
import Home from './Pages/Home';

function App() {
  return (
    <>
    <ToastContainer/>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/allproducts' element={<ProductsList/>} />
      <Route path='/product/:id' element={<ProductDetails/>} />
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/category/:id/:title' element={<Category/>}/>
      <Route path='/users' element={<Users/>}/>
     </Routes>
     </BrowserRouter> 
    </>
  );
}

export default App;
