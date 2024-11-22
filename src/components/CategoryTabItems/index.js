import './index.css'
import {useState} from 'react'

const CategoryTabItems = props => {
  const {tabName, tabList, menuCategoryId, getUpdatedList, isActive} = props

  const onClickTabId = () => {
    const filteredData = tabList.find(eachItem => {
      return eachItem.menu_category_id === menuCategoryId
    })

    const updatedData = {
      categoryDishes: filteredData.category_dishes,
      menuCategory: filteredData.menu_category,
      menuCategoryId: filteredData.menu_category_id,
      menuCategoryImage: filteredData.menu_category_image,
      nexturl: filteredData.nexturl,
    }

    getUpdatedList(updatedData.categoryDishes)
  }
  const tabClassName = isActive ? 'tab-item active' : 'tab-item'
  return (
    <>
      <li>
        <button onClick={onClickTabId} className={tabClassName}>
          {tabName}
        </button>
      </li>
    </>
  )
}

export default CategoryTabItems
