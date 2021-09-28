import * as React from 'react';
import { getRootClassNames, useEditorRef } from '@udecode/slate-plugins';
import { styled } from '@uifabric/utilities';
import { Transforms } from 'slate';
import { useFocused, useSelected } from 'slate-react';
import { useHotkeys } from '../hooks/useHotkeys';
import { useOnMouseClick } from '../hooks/useOnMouseClick';
import { getTagElementStyles } from './TagElement.styles';
const getClassNames = getRootClassNames();
/**
 * TagElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */
export const TagElementBase = ({ attributes, children, element, styles, className, }) => {
    const editor = useEditorRef();
    const selected = useSelected();
    const focused = useFocused();
    const onClickProps = useOnMouseClick(() => console.info('tag clicked'));
    useHotkeys('backspace', () => {
        if (selected && focused && editor.selection) {
            // commented the below as it was causing the issue when deleting a line 
            // Transforms.move(editor);
        }
    }, [selected, focused]);
    useHotkeys('delete', () => {
        if (selected && focused && editor.selection) {
            Transforms.move(editor, { reverse: true });
        }
    }, [selected, focused]);
    const classNames = getClassNames(styles, {
        className,
        // Other style props
        selected,
        focused,
    });
    return (React.createElement("div", Object.assign({}, attributes, { "data-slate-value": element.value, className: classNames.root, contentEditable: false }),
        React.createElement("div", Object.assign({}, onClickProps), element.value),
        children));
};
/**
 * TagElement
 */
export const TagElement = styled(TagElementBase, getTagElementStyles, undefined, {
    scope: 'TagElement',
});