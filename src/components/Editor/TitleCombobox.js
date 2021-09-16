import React from 'react'
import {
  ComboboxItem,
  ComboboxRoot,
} from '../AutoSuggestions/components/TagCombobox.styles'

function DropdownCombobox({ menuProps, isOpen, highlightedIndex, comboboxRef, inputItems, getItemProps }) {
  
  return (
    <div>
      <ComboboxRoot {...menuProps} ref={comboboxRef} isOpen={isOpen}>
        {isOpen &&
          inputItems.map((item, index) => (
            <ComboboxItem highlighted={highlightedIndex === index}
              key={`${item}${index}`}
              {...getItemProps({item, index, isSelected: highlightedIndex === index})}
            >
              {item}
            </ComboboxItem>
          ))}
      </ComboboxRoot>
    </div>
  )
}

export default DropdownCombobox