import { Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main/Main';
import NotFound from './components/pages/NotFound/NotFound';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Product from './components/pages/Product/Product';
import Cart from './components/pages/Cart/Cart';
import Form from './components/pages/Form/Form';
import './App.css';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
