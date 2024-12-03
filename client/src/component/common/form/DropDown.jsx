/* eslint-disable react/prop-types */

import InputFeild from "./InputFeild"


const DropDown = ({ name, options, handleChange, dropdown, handleFilter, date = false }) => {

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
          <option key={option} value={option.toLowerCase()} >
            {option}
          </option>
        ))
      }
    </select>
  )
}

export default DropDown
