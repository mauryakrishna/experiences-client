import { getRenderElement, getSlatePluginTypes } from '@udecode/slate-plugins'
import { ELEMENT_TAG } from './defaults'
import { getTagDeserialize } from './getTagDeserialize'

/**
 * Plugin for showing auto suggestions as soon as user types in editor.
 */
export const createAutoSuggestionsPlugin = () => ({
  renderElement: getRenderElement(ELEMENT_TAG),
  deserialize: getTagDeserialize(),
  inlineTypes: getSlatePluginTypes(ELEMENT_TAG),
  voidTypes: getSlatePluginTypes(ELEMENT_TAG),
})
