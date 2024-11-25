import './index.css'

const Header = props => {
  const {tabName, menuCategoryId, isActive, handleTabClick} = props

  const onTabClick = () => {
    handleTabClick(menuCategoryId)
  }

  const tabClassName = isActive ? 'tab-item active-tab' : 'tab-item'

  return (
    <li className={tabClassName}>
      <button type="button" className="tab-button" onClick={onTabClick}>
        {tabName}
      </button>
    </li>
  )
}

export default Header
