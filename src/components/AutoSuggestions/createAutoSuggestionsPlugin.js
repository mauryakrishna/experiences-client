import { getRenderElement, getSlatePluginTypes } from '@udecode/slate-plugins'
import { ELEMENT_P } from './defaults'
// import { getTagDeserialize } from './getTagDeserialize'

/**
 * Plugin for showing auto suggestions as soon as user types in editor.
 */
export const createAutoSuggestionsPlugin = () => ({
  renderElement: getRenderElement(ELEMENT_P),
  // deserialize: getTagDeserialize(),
  inlineTypes: getSlatePluginTypes(ELEMENT_P),
  voidTypes: getSlatePluginTypes(ELEMENT_P),
})
