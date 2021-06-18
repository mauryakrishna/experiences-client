import React, { useEffect } from 'react'
import useMergedRef from '@react-hook/merged-ref'
import {
  getPreventDefaultHandler,
  PortalBody,
  useEditorState,
} from '@udecode/slate-plugins'
import {
  ComboboxItem,
  ComboboxRoot,
} from '../../AutoSuggestions/components/TagCombobox.styles'
import { setElementPositionByRange } from '../../AutoSuggestions/utils/setElementPositionByRange'
import { useComboboxControls } from '../hooks/useComboboxControls'
import { useComboboxIsOpen } from '../selectors/useComboboxIsOpen'
import { useComboboxStore } from '../useComboboxStore'

export const Combobox = ({ onSelectItem, onRenderItem }) => {
  // TODO
  const at = useComboboxStore((state) => state.targetRange)
  const items = useComboboxStore((state) => state.items)
  const itemIndex = useComboboxStore((state) => state.itemIndex)
  const combobox = useComboboxControls()
  const isOpen = useComboboxIsOpen()

  const ref = React.useRef(null)
  const editor = useEditorState()
  // const _editor = useStoreEditorState(useEventEditorId('focus'));
  // console.log(editor === _editor);

  useEffect(() => {
    editor && setElementPositionByRange(editor, { ref, at })
  }, [at, editor])

  const menuProps = combobox ? combobox.getMenuProps() : { ref: null }

  const multiRef = useMergedRef(menuProps.ref, ref)

  if (!combobox) return null

  return (
    <PortalBody>
      <ComboboxRoot {...menuProps} ref={multiRef} isOpen={isOpen}>
        {isOpen &&
          items.map((item, index) => {
            const Item = onRenderItem ? onRenderItem({ item }) : item.text

            return (
              <ComboboxItem
                key={item.key}
                highlighted={index === itemIndex}
                {...combobox.getItemProps({
                  item,
                  index,
                })}
                onMouseDown={
                  editor && getPreventDefaultHandler(onSelectItem, editor, item)
                }
              >
                {Item}
              </ComboboxItem>
            )
          })}
      </ComboboxRoot>
    </PortalBody>
  )
}
