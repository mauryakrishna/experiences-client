import 'tippy.js/dist/tippy.css'
// import './index.css'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import {
  ELEMENT_H1,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  createSlatePluginsComponents,
  createSlatePluginsOptions,
  HeadingToolbar,
  MentionSelect,
  SlatePlugin,
  SlatePlugins,
  ToolbarSearchHighlight,
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHistoryPlugin,
  createKbdPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createNormalizeTypesPlugin,
  createParagraphPlugin,
  createReactPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  createDeserializeHTMLPlugin,
  useFindReplacePlugin,
  useMentionPlugin,
  withProps,
  MentionElement,
  ELEMENT_MENTION,
  SPEditor,
} from '@udecode/slate-plugins'
import { optionsAutoformat } from './config/autoformatRules'
import {
  editableProps,
  optionsExitBreakPlugin,
  // optionsMentionPlugin,
  optionsResetBlockTypePlugin,
  optionsSoftBreakPlugin,
} from './config/pluginOptions'
// import { renderMentionLabel } from './config/renderMentionLabel'
import { BallonToolbarMarks, ToolbarButtons } from './config/Toolbars'
import { withStyledPlaceHolders } from './config/withStyledPlaceHolders'
import { withStyledDraggables } from './config/withStyledDraggables'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const id = 'Examples/Playground'

let components = createSlatePluginsComponents({
  // [ELEMENT_MENTION]: withProps(MentionElement, {
  //   renderLabel: renderMentionLabel,
  // }),
  // customize your components by plugin key
})
// components = withStyledPlaceHolders(components)
// components = withStyledDraggables(components)

const options = createSlatePluginsOptions({
  // customize your options by plugin key
})

const WriteEditor = ({ initialValue, onChangeCb, placeholder, style }) => {
  const { setSearch, plugin: searchHighlightPlugin } = useFindReplacePlugin()
  // const { getMentionSelectProps, plugin: mentionPlugin } = useMentionPlugin(
  //   optionsMentionPlugin
  // )

  // override to use passed one
  editableProps.placeholder = placeholder;
  editableProps.style = style || editableProps.style;
  const plugins = useMemo(() => {
    const p = [
      createReactPlugin(),
      createHistoryPlugin(),
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      createMediaEmbedPlugin(),
      createCodeBlockPlugin(),
      createAlignPlugin(),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      createHighlightPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createKbdPlugin(),
      createNodeIdPlugin(),
      createAutoformatPlugin(optionsAutoformat),
      createResetNodePlugin(optionsResetBlockTypePlugin),
      createSoftBreakPlugin(optionsSoftBreakPlugin),
      createExitBreakPlugin(optionsExitBreakPlugin),
      // commented lines below are for forced layout usage
      // createNormalizeTypesPlugin({
      //   rules: [{ path: [0, 0], strictType: options[ELEMENT_H1].type }],
      // }),
      createTrailingBlockPlugin({
        type: options[ELEMENT_PARAGRAPH].type,
        level: 1,
      }),
      createSelectOnBackspacePlugin({ allow: options[ELEMENT_IMAGE].type }),
      // mentionPlugin,
      searchHighlightPlugin,
    ]

    p.push(createDeserializeHTMLPlugin({ plugins: p }))

    return p
  }, [/*mentionPlugin,*/ searchHighlightPlugin])

  return (
    <DndProvider backend={HTML5Backend}>
      <SlatePlugins
        id={id}
        plugins={plugins}
        components={components}
        options={options}
        editableProps={editableProps}
        initialValue={initialValue}
        onChange={(newValue) => {
          onChangeCb(newValue)
        }}
      >
        <HeadingToolbar>
          <ToolbarButtons />
        </HeadingToolbar>

        <BallonToolbarMarks />
      </SlatePlugins>
    </DndProvider>
  )
}

WriteEditor.defaultProps = {
  onChangeCb: ()=> {},
  placeholder: 'that moment...',
  style: {}
}

WriteEditor.propTypes = {
  initialValue: PropTypes.array.isRequired,
  onChangeCb: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object
};


export default WriteEditor;