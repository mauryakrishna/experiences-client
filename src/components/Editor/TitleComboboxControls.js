import { useMemo } from 'react'
import { useCombobox } from 'downshift'

export const useComboboxControls = () => {
  // Menu combobox
  const {
    closeMenu,
    getMenuProps,
    getComboboxProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    isOpen,
    items,
    circularNavigation: true,
    // onInputValueChange: ({inputValue}) => {
    //   setInputItems(
    //     items.filter(item =>
    //       item.toLowerCase().startsWith(inputValue.toLowerCase()),
    //     ),
    //   )
    // },
    // onSelectedItemChange: (changes) => {
    //   console.info(changes);
    // },
  })
  getMenuProps({}, { suppressRefError: true })
  getComboboxProps({}, { suppressRefError: true })
  getInputProps({}, { suppressRefError: true })

  return useMemo(
    () => ({
      closeMenu,
      getMenuProps,
      getItemProps,
    }),
    [closeMenu, getItemProps, getMenuProps]
  )
}
