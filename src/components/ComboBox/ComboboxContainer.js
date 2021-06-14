import React, { useMemo, useCallback } from 'react'
import {
  createHistoryPlugin,
  createReactPlugin,
  useStoreEditorRef,
} from '@udecode/slate-plugins'
import { MENTIONABLES } from './config/mentionables'
import { useComboboxControls } from './hooks/useComboboxControls'
import { useComboboxOnKeyDown } from './hooks/useComboboxOnKeyDown'
import { useComboboxIsOpen } from './selectors/useComboboxIsOpen'
import { useComboboxStore } from './useComboboxStore'
import { TagCombobox } from './tag/components/TagCombobox'
import { TagElement } from './tag/components/TagElement'
import { createAutoSuggestionsPlugin } from '../AutoSuggestions/createAutoSuggestionsPlugin'
// import { ELEMENT_TAG } from './tag/defaults'
import { useTagOnChange } from './tag/hooks/useTagOnChange'
import { useTagOnSelectItem } from './tag/hooks/useTagOnSelectItem'

// Handle multiple combobox
const useComboboxOnChange = () => {
  const editor = useStoreEditorRef(id)

  const tagOnChange = useTagOnChange(editor, MENTIONABLES)
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

const comboboxOnChange = useComboboxOnChange()

const tagOnSelect = useTagOnSelectItem()

// Handle multiple combobox
const comboboxOnKeyDown = useComboboxOnKeyDown({
  onSelectItem: tagOnSelect,
})

const plugins = useMemo(
  () => [
    createReactPlugin(),
    createHistoryPlugin(),
    createAutoSuggestionsPlugin(),
    {
      onChange: comboboxOnChange,
      onKeyDown: comboboxOnKeyDown,
    },
  ],
  [comboboxOnChange, comboboxOnKeyDown]
)

const ComboboxContainer = () => {
  useComboboxControls()

  return <TagCombobox />
}

export default ComboboxContainer
export { plugins }