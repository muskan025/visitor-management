/* eslint-disable react/prop-types */

const DropDown = ({ name, options, handleChange, dropdown, handleFilter}) => {

  function handleDropdown(e) {
    handleChange(e)
    if (dropdown === 'sort') {
       handleFilter(e.target.value)
    }
  }

  return (
    <select name={name} onChange={(e) => handleDropdown(e)}  >
      <option value={name} hidden  >{`${dropdown === 'sort' ? 'Sort' : 'Select'} ${name}`}</option>
      {
        options.length > 0 && options.map((option) => (
          <option key={option.name ? option.name : option} value={option.name ? option.name : option.toLowerCase()} >
            {option.name ? option.name : option}
          </option>
        ))
      }
    </select>
  )
}

export default DropDown
