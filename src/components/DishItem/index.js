import React, {useState} from 'react'

import './index.css'

const DishItem = props => {
  const {dishItem, updateCart} = props
  const {
    dishAvailability,
    dishImage,
    dishName,
    dishDescription,
    dishPrice,
    dishCalories,
    dishType,
    addonCat,
  } = dishItem

  const [quantity, setQuantity] = useState(0)

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
    updateCart(dishItem, 1)
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1)
      updateCart(dishItem, -1)
    }
  }

  const isVeg = dishType === 1 ? 'category-cont' : 'category-cont-green'
  const circle = dishType === 1 ? 'circle' : 'circle-green'

  const addOnAvailable = dishAvailability ? (
    <div className="add-on-con">
      <button type="button" onClick={handleDecrement}>
        -
      </button>
      <span className="element-increament">{quantity}</span>

      <button type="button" onClick={handleIncrement}>
        +
      </button>
    </div>
  ) : (
    <p className="error">Not available</p>
  )

  const customizationsAvailable =
    addonCat.length !== 0 ? (
      <p className="customizations-text">Customizations available</p>
    ) : null

  return (
    <>
      <li className="dish-card">
        <div className="dish-details">
          <div className={isVeg}>
            <div className={circle} />
          </div>

          <div className="dish-items">
            <h1 className="dish-name">{dishName}</h1>
            <p>SAR {dishPrice}</p>
            <p className="description">{dishDescription}</p>
            {addOnAvailable}
            {customizationsAvailable}
          </div>
          <div className="calories">
            <p>{dishCalories} calories</p>
            <img src={dishImage} alt={dishName} className="dish-image" />
          </div>
        </div>
      </li>
    </>
  )
}

export default DishItem
