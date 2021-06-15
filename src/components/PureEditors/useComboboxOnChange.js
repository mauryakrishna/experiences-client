
import { useTagOnChange } from '../AutoSuggestions/hooks/useTagOnChange'
import { useStoreEditorRef } from '@udecode/slate-plugins'

// Handle multiple combobox
export const useComboboxOnChange = () => {
  const id = "someid"
  const editor = useStoreEditorRef(id)

  const tagOnChange = useTagOnChange(editor, [{name: "Some name", value: "some value"}])
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