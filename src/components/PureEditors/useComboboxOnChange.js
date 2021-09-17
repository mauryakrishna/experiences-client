
import { useTagOnChange } from '../AutoSuggestions/hooks/useTagOnChange'
import { useStoreEditorRef } from '@udecode/slate-plugins'
import { useComboboxIsOpen } from '../ComboBox/selectors/useComboboxIsOpen'
import { useComboboxStore } from '../ComboBox/useComboboxStore'
import { useCallback } from 'react'

// Handle multiple combobox
export const useComboboxOnChange = () => {
  const id = 'Examples/Playground'
  const editor = useStoreEditorRef(id)
  const tagOnChange = useTagOnChange(editor)
  const isOpen = useComboboxIsOpen()
  const closeMenu = useComboboxStore((state) => state.closeMenu)

  return useCallback(
    () => () => {
      let changed = false
      changed = tagOnChange()

      if (changed) return

      if (!changed && isOpen) {
        closeMenu()
      }
    },
    [closeMenu, isOpen, tagOnChange]
  )
}