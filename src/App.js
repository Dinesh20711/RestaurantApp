import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'

import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {cartList: []}

  addCartItem = dish => {
    const {cartList} = this.state
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)

    if (isAlreadyExists === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, dish]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        ),
      }))
    }
  }

  removeCartItem = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.dishId !== dishId),
    }))
  }

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const dishItem = cartList.find(item => item.dishId === dishId)
    if (dishItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(item => item.dishId !== dishId),
      }))
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
