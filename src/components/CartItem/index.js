import {FaRegTrashAlt} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {
    dishId,
    dishName,
    dishImage,
    quantity,
    dishCurrency,
    dishPrice,
  } = cartItemDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const onIncreaseQty = () => incrementCartItemQuantity(dishId)
        const onDecreaseQty = () => decrementCartItemQuantity(dishId)
        const onRemoveCartItem = () => removeCartItem(dishId)

        return (
          <li className="cart-item-container">
            <img className="cart-item-image" src={dishImage} alt={dishName} />
            <div className="cart-item-details">
              <p className="cart-item-name">{dishName}</p>
              <p className="currency-price">
                {dishCurrency} {quantity * dishPrice}
              </p>
              <div className="control-btn-group">
                <button
                  type="button"
                  className="control-btn"
                  onClick={onDecreaseQty}
                >
                  -
                </button>
                <p className="cart-item-quantity">{quantity}</p>
                <button
                  type="button"
                  className="control-btn"
                  onClick={onIncreaseQty}
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="button"
              className="remove-btn text-danger align-self-center"
              onClick={onRemoveCartItem}
            >
              <FaRegTrashAlt className="delete-icon" />
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartItem
