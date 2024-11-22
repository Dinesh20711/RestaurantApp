import {Component} from 'react'
import './index.css'
import {FaOpencart} from 'react-icons/fa'
import CategoryTabItems from '../CategoryTabItems'
import DishesCard from '../DishesCard'

class Home extends Component {
  state = {tabList: [], dishesItem: [], activeTabId: null}

  fetchApiData = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    const response = await fetch(api)
    const data = await response.json()
    const fetchedTabList = data[0].table_menu_list

    // Set the first tab as active and fetch its dishes
    const firstTab = fetchedTabList[0]
    const firstTabDishes = firstTab.category_dishes.map(eachItem => ({
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

    this.setState({
      tabList: fetchedTabList,
      dishesItem: firstTabDishes,
      activeTabId: firstTab.menu_category_id,
    })
  }

  componentDidMount() {
    this.fetchApiData()
  }

  getUpdatedList = (updatedList, tabId) => {
    const convertedList = updatedList.map(eachItem => {
      return {
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
      }
    })

    this.setState({dishesItem: convertedList, activeTabId: tabId})
  }

  render() {
    const {tabList, dishesItem} = this.state
    console.log(tabList)
    console.log(dishesItem)

    return (
      <div className="bg-container">
        <nav className="nav-container">
          <h1 className="restaurent-name-heading">UNI Resto Cafe</h1>

          <div className="cart-container">
            <FaOpencart className="cart-icon" />
            <span className="badge">0</span>
          </div>
        </nav>
        <ul className="tab-container">
          {tabList.map(eachItem => {
            return (
              <CategoryTabItems
                tabList={tabList}
                tabName={eachItem.menu_category}
                key={eachItem.menu_category_id}
                menuCategoryId={eachItem.menu_category_id}
                getUpdatedList={updatedList =>
                  this.getUpdatedList(updatedList, eachItem.menu_category_id)
                }
                isActive={this.state.activeTabId === eachItem.menu_category_id}
              />
            )
          })}
        </ul>
        <ul>
          {dishesItem.map(eachItem => {
            return <DishesCard dishItem={eachItem} key={eachItem.dishId} />
          })}
        </ul>
      </div>
    )
  }
}

export default Home
