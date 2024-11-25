import {Component} from 'react'
import {FaOpencart} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import DishItem from '../DishItem'
import './index.css'

class Home extends Component {
  state = {
    tabList: [],
    dishesItem: [],
    activeTabId: null,
    cart: {},
    isLoading: true,
  }

  componentDidMount() {
    this.fetchApiData()
  }

  fetchApiData = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    try {
      const response = await fetch(api)
      const data = await response.json()
      const fetchedTabList = data[0].table_menu_list

      const firstTab = fetchedTabList[0]
      const firstTabDishes = this.convertDishList(firstTab.category_dishes)

      this.setState({
        tabList: fetchedTabList,
        dishesItem: firstTabDishes,
        activeTabId: firstTab.menu_category_id,
        isLoading: false, // Set loading to false after data is fetched
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({isLoading: false}) // Stop loading even if an error occurs
    }
  }

  convertDishList = dishList =>
    dishList.map(eachItem => ({
      addonCat: eachItem.addonCat,
      dishAvailability: eachItem.dish_Availability,
      dishType: eachItem.dish_Type,
      dishCalories: eachItem.dish_calories,
      dishCurrency: eachItem.dish_currency,
      dishDescription: eachItem.dish_description,
      dishId: eachItem.dish_id,
      dishImage: eachItem.dish_image,
      dishName: eachItem.dish_name,
      dishPrice: eachItem.dish_price,
      nexturl: eachItem.nexturl,
    }))

  handleTabClick = menuCategoryId => {
    const {tabList} = this.state
    const selectedTab = tabList.find(
      tab => tab.menu_category_id === menuCategoryId,
    )

    if (selectedTab) {
      const updatedDishes = this.convertDishList(selectedTab.category_dishes)
      this.setState({dishesItem: updatedDishes, activeTabId: menuCategoryId})
    }
  }

  updateCart = (dish, quantityChange) => {
    this.setState(prevState => {
      const {cart} = prevState
      const currentQuantity = cart[dish.dishId] || 0
      const newQuantity = currentQuantity + quantityChange

      if (newQuantity <= 0) {
        const updatedCart = {...cart}
        delete updatedCart[dish.dishId]
        return {cart: updatedCart}
      }

      return {cart: {...cart, [dish.dishId]: newQuantity}}
    })
  }

  getTotalCartQuantity = () => {
    const {cart} = this.state
    return Object.values(cart).reduce((acc, quantity) => acc + quantity, 0)
  }

  render() {
    const {tabList, dishesItem, activeTabId, isLoading} = this.state

    if (isLoading) {
      return (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      )
    }

    return (
      <>
        <div className="bg-container">
          <nav className="nav-container">
            <h1 className="restaurent-name-heading">UNI Resto Cafe</h1>

            <div className="cart-container">
              <p className="orders-list">My orders</p>
              <FaOpencart className="cart-icon" />
              <p role="status" aria-label="cart-count" className="badge">
                {this.getTotalCartQuantity()}
              </p>
            </div>
          </nav>

          <ul className="tab-container">
            {tabList.length > 0 &&
              tabList.map(eachItem => (
                <Header
                  key={eachItem.menu_category_id}
                  tabName={eachItem.menu_category}
                  menuCategoryId={eachItem.menu_category_id}
                  isActive={activeTabId === eachItem.menu_category_id}
                  handleTabClick={this.handleTabClick}
                />
              ))}
          </ul>
          <ul className="dishes-list">
            {dishesItem.map(eachItem => (
              <DishItem
                key={eachItem.dishId}
                dishItem={eachItem}
                updateCart={this.updateCart}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Home
