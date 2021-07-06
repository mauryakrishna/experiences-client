import * as React from 'react'
import { Combobox } from '../../ComboBox/components/Combobox'
import { ComboboxKey, useComboboxStore } from '../../ComboBox/useComboboxStore'
import { useTagOnSelectItem } from '../hooks/useTagOnSelectItem'
import { TagComboboxItem } from './TagComboboxItem'

export const TagComboboxComponent = () => {
  const onSelectItem = useTagOnSelectItem()

  return <Combobox onSelectItem={onSelectItem} onRenderItem={TagComboboxItem} />
}

export const TagCombobox = () => {
  const key = useComboboxStore((state) => state.key)
  return (
    <div style={key !== ComboboxKey.TAG ? { display: 'none' } : {}}>
      <TagComboboxComponent />
    </div>
  )
}
