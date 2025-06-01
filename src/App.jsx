import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import AllProducts from './pages/allProducts/allProducts'
import Cart from './pages/cart/cart'
import Order from './pages/order/order'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Nopage from './pages/nopage/nopage'
import MyState from './context/data/MyState'
import Login from './pages/registration/Login'
import Signup from './pages/registration/SignUp'
import ProductInfo from './pages/productInfo/ProductInfo'
import AddProduct from './pages/admin/page/AddProduct'
import UpdateProduct from './pages/admin/page/UpdateProduct'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Children } from 'react'


function App() {
    return (
      <MyState>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path='/order' element={
              <ProtectedRoutes>
                <Order />
              </ProtectedRoutes>
            } />
            <Route path='/dashboard' element={
              <AdminProtectedRoutes>
                <Dashboard />
              </AdminProtectedRoutes>
            } />
            <Route path='*' element={<Nopage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/productInfo/:id' element={<ProductInfo />} />
            <Route path='/addproduct' element={
              <AdminProtectedRoutes>
                <AddProduct />
              </AdminProtectedRoutes>
            } />
            <Route path='/updateproduct' element={
              <AdminProtectedRoutes>
                <UpdateProduct />
              </AdminProtectedRoutes>
            } />
            
          </Routes>
          <ToastContainer/>
        </Router>
      </MyState>
    )
}

export default App
//useer
//user
export const ProtectedRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};
//admin
const AdminProtectedRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.user?.email === 'gopi1234@gmail.com') {
    return children;
  } else {
    return <Navigate to='/login' />;
  }   
};