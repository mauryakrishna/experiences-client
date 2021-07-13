import { useCallback } from 'react'
import { MentionNodeData } from '@udecode/slate-plugins'
import shallow from 'zustand/shallow'
import { useComboboxOnChange } from '../../ComboBox/hooks/useComboboxOnChange'
import { ComboboxKey, useComboboxStore } from '../../ComboBox/useComboboxStore'

export const useTagOnChange = (editor, data) => {
  const comboboxOnChange = useComboboxOnChange({
    editor,
    key: ComboboxKey.TAG,
    trigger: `[A-za-z0-9]`
  })
  const { maxSuggestions, setItems, setTargetRange } = useComboboxStore(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({ maxSuggestions, setItems, setTargetRange }) => ({
      maxSuggestions,
      setItems,
      setTargetRange,
    }),
    shallow
  )

  return useCallback(() => {
    const res = comboboxOnChange()
    if (!res) return false

    const { search } = res

    const items = data
      .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, maxSuggestions)
      .map((item) => ({
        key: item.value,
        text: item.name,
      }))

    setItems(items)
    // this is when, user continues to type and no match from the combobox then set the range as null
    // so as to close the combobox
    items.length === 0 && setTargetRange(null)

    return true
  }, [comboboxOnChange, data, maxSuggestions, setItems])
}
