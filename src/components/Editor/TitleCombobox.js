import React, { useState, useRef } from 'react'
import {render} from 'react-dom'
import {useCombobox} from 'downshift'
import {items, menuStyles, comboboxStyles} from './shared'
import TitleComboboxRoot from './TitleComboboxRoot'

function DropdownCombobox({ menuProps, isOpen, highlightedIndex, comboboxRef, inputItems }) {
  // const [inputItems, setInputItems] = useState(items)
  // const {
  //   isOpen,
  //   getToggleButtonProps,
  //   getLabelProps,
  //   getMenuProps,
  //   getInputProps,
  //   getComboboxProps,
  //   highlightedIndex,
  //   getItemProps,
  // } = useCombobox({
  //   items: inputItems,
  //   onInputValueChange: ({inputValue}) => {
  //     setInputItems(
  //       items.filter((item) =>
  //         item.toLowerCase().startsWith(inputValue.toLowerCase()),
  //       ),
  //     )
  //   },
  // })
  return (
    <div>
      {/* <label {...getLabelProps()}>Choose an element:</label>
      <div style={comboboxStyles} {...getComboboxProps()}>
        <input {...getInputProps()} />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          &#8595;
        </button>
      </div> */}
      <TitleComboboxRoot {...menuProps} ref={comboboxRef} isOpen={isOpen}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
              }
              key={`${item}${index}`}
              // {...getItemProps({item, index})}
            >
              {item}
            </li>
          ))}
      </TitleComboboxRoot>
    </div>
  )
}

export default DropdownCombobox