import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import DishItem from '../DishItem'

import './index.css'

class Home extends Component {
  state = {isLoading: true, responseData: [], activeCategoryId: ''}

  componentDidMount() {
    this.fetchRestaurantApi()
  }

  getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  fetchRestaurantApi = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    const updatedData = this.getUpdatedData(data[0].table_menu_list)
    this.setState({
      isLoading: false,
      activeCategoryId: updatedData[0].menuCategoryId,
      responseData: updatedData,
    })
  }

  renderTabMenuList = () => {
    const {responseData, activeCategoryId} = this.state

    return responseData.map(eachCategory => {
      const onClickHandler = () => {
        this.setState({activeCategoryId: eachCategory.menuCategoryId})
      }

      const buttonClassName =
        eachCategory.menuCategoryId === activeCategoryId
          ? 'active-category-button'
          : 'each-category-button'

      return (
        <li key={eachCategory.menuCategoryId}>
          <button
            type="button"
            className={buttonClassName}
            onClick={onClickHandler}
          >
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })
  }

  renderDishes = () => {
    const {responseData, activeCategoryId} = this.state
    const {categoryDishes} = responseData.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(eachDish => (
          <DishItem key={eachDish.dishId} dishDetails={eachDish} />
        ))}
      </ul>
    )
  }

  renderSpinner = () => (
    <div className="spinner-container">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          this.renderSpinner()
        ) : (
          <div>
            <Header />
            <ul className="menu-categories-list">{this.renderTabMenuList()}</ul>
            <div className="res-body-container">{this.renderDishes()}</div>
          </div>
        )}
      </>
    )
  }
}

export default Home
