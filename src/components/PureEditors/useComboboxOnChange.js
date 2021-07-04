
import { useTagOnChange } from '../AutoSuggestions/hooks/useTagOnChange'
import { useStoreEditorRef } from '@udecode/slate-plugins'
import { useComboboxIsOpen } from '../ComboBox/selectors/useComboboxIsOpen'
import { useComboboxStore } from '../ComboBox/useComboboxStore'
import { useCallback } from 'react'

// Handle multiple combobox
export const useComboboxOnChange = () => {
  const id = 'Examples/Playground'
  const editor = useStoreEditorRef(id)
  const tagOnChange = useTagOnChange(editor, [
    {name: "Some name", value: "some value", email: "somename@email.com"}, 
    {name: "Some name1", value: "some value1", email: "somename1@email.com"}
  ])
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