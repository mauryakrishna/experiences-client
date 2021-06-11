import { useComboboxControls } from './hooks/useComboboxControls'
import { TagCombobox } from './tag/components/TagCombobox'

const ComboboxContainer = () => {
  useComboboxControls()

  return <TagCombobox />
}

export default ComboboxContainer