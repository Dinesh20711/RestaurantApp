import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useContext} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

import CartContext from '../../context/CartContext'

const Header = props => {
  const {cartList} = useContext(CartContext)

  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-header">
      <Link to="/" className="link-element">
        <h1 className="logo-heading">UNI Resto Cafe</h1>
      </Link>
      <div className="order-cart-div">
        <p className="my-orders-text">My Orders</p>
        <div className="cart-count-badge">
          <Link to="/cart">
            <button className="cart-button" type="button" data-testid="cart">
              <AiOutlineShoppingCart className="cart-icon" />
            </button>
          </Link>
          <p className="cart-count">{cartList.length}</p>
        </div>
        <button
          className="cart-button display-sm-button"
          onClick={onClickLogoutButton}
          type="button"
        >
          <FiLogOut className="logout-icon" />
        </button>
        <button
          className="display-lg-button"
          type="button"
          onClick={onClickLogoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
