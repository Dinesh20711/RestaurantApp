import {useState, useContext} from 'react'
import './index.css'
import {BsCircleFill} from 'react-icons/bs'
import CartContext from '../../context/CartContext'

const DishItem = props => {
  const {dishDetails} = props
  const {
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onAddItemToCart = () => addCartItem({...dishDetails, quantity})

  const increaseQuantity = () => setQuantity(prevState => prevState + 1)
  const decreaseQuantity = () =>
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))

  const renderControllerButton = () => (
    <div className="controller-container">
      <button className="button" type="button" onClick={decreaseQuantity}>
        -
      </button>
      <p className="quantity">{quantity}</p>
      <button className="button" type="button" onClick={increaseQuantity}>
        +
      </button>
    </div>
  )

  return (
    <li className="dish-item-container">
      <div className={dishType === 1 ? 'non-veg-border' : 'veg-border'}>
        <BsCircleFill
          className={dishType === 1 ? 'non-veg-round' : 'veg-round'}
        />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && renderControllerButton()}
        {!dishAvailability && <p className="available-text">Not available</p>}
        {addonCat.length !== 0 && (
          <p className="custom-text">Customizations available</p>
        )}
        {quantity > 0 && (
          <button
            className="add-to-cart-button"
            type="button"
            onClick={onAddItemToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>

      <div className="calories-image-con">
        <p className="dish-calories">{dishCalories} calories</p>
        <img className="dish-image" src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}

export default DishItem
