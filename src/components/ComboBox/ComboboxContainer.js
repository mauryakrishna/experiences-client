import React, { useMemo, useCallback } from 'react'
import {
  createHistoryPlugin,
  createReactPlugin,
  useStoreEditorRef,
} from '@udecode/slate-plugins'
// import { MENTIONABLES } from './config/mentionables'
import { useComboboxControls } from './hooks/useComboboxControls'
// import { useComboboxOnKeyDown } from './hooks/useComboboxOnKeyDown'
// import { useComboboxIsOpen } from './selectors/useComboboxIsOpen'
// import { useComboboxStore } from './useComboboxStore'
import { TagCombobox } from '../AutoSuggestions/components/TagCombobox'
// import { TagElement } from './tag/components/TagElement'
import { createAutoSuggestionsPlugin } from '../AutoSuggestions/createAutoSuggestionsPlugin'
// import { ELEMENT_TAG } from './tag/defaults'


// const comboboxOnChange = useComboboxOnChange()



// const plugins = useMemo(
//   () => [
//     createReactPlugin(),
//     createHistoryPlugin(),
//     createAutoSuggestionsPlugin(),
//     {
//       onChange: comboboxOnChange,
//       onKeyDown: comboboxOnKeyDown,
//     },
//   ],
//   [comboboxOnChange, comboboxOnKeyDown]
// )

const ComboboxContainer = () => {
  useComboboxControls()

  return <TagCombobox />
}

export default ComboboxContainer
// export { plugins }