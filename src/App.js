import {useState} from 'react'

import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'

function App() {
  const [showCart, setShowCart] = useState(false)

  const orderHandler = () => {
    setShowCart(true)
  }
  const orderCancelHandler = () => {
    setShowCart(false)
  }
  return (
    <CartProvider>
      {showCart && <Cart onCloseModal={orderCancelHandler} />}
      <Header onOrder={orderHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App
