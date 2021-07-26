import React, { useState, useRef } from 'react'
import {render} from 'react-dom'
import {useCombobox} from 'downshift'
import {items, menuStyles, comboboxStyles} from './shared'
import {
  ComboboxItem,
  ComboboxRoot,
} from '../AutoSuggestions/components/TagCombobox.styles'

function DropdownCombobox({ menuProps, isOpen, highlightedIndex, comboboxRef, inputItems, getItemProps }) {
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
      <ComboboxRoot {...menuProps} ref={comboboxRef} isOpen={isOpen}>
        {isOpen &&
          inputItems.map((item, index) => (
            <ComboboxItem highlighted={highlightedIndex === index}
              key={`${item}${index}`}
              {...getItemProps({item, index})}
            >
              {item}
            </ComboboxItem>
          ))}
      </ComboboxRoot>
    </div>
  )
}

export default DropdownCombobox