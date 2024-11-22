import './index.css'

const DishesCard = props => {
  const {dishItem} = props
  const {dishImage, dishName, dishDescription, dishPrice, dishCalories} =
    dishItem

  return (
    <li className="dish-card">
      <img src={dishImage} alt={dishName} className="dish-image" />
      <div className="dish-details">
        <h1>{dishName}</h1>
        <p>{dishDescription}</p>
        <p>Price: SAR {dishPrice}</p>
        <p>Calories: {dishCalories}</p>
      </div>
    </li>
  )
}

export default DishesCard
