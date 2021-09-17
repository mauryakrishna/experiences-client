import { useCallback } from 'react'
import shallow from 'zustand/shallow'
import { useComboboxOnChange } from '../../ComboBox/hooks/useComboboxOnChange'
import { ComboboxKey, useComboboxStore } from '../../ComboBox/useComboboxStore'
import autoSuggestion from "../../../services/autosuggestions"

export const useTagOnChange = (editor) => {
  const comboboxOnChange = useComboboxOnChange({
    editor,
    key: ComboboxKey.TAG,
    trigger: `[A-Za-z0-9]`
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
    const items = []
    autoSuggestion(search)
      .then((resp)=> {
        if(resp) {
          setItems(resp.twords[0].options)
        }
        else {
          // this is when, user continues to type and no match from the combobox then set the range as null
          // so as to close the combobox
          items.length === 0 && setTargetRange(null)
          setItems([])
        }
      })

    return true
  }, [comboboxOnChange, data, maxSuggestions, setItems])
}
