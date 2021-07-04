import { escapeRegExp, getText } from '@udecode/slate-plugins';
import { Editor } from 'slate';
/**
 * Get text and range from trigger to cursor.
 * Starts with trigger and ends with non-whitespace character.
 * TODO: move to plugins
 */
export const getTextFromTrigger = (editor, { at, trigger }) => {
    const escapedTrigger = escapeRegExp(trigger);
    console.log('escapedTrigger', escapedTrigger);
    const triggerRegex = new RegExp(escapedTrigger);
    console.log('triggerRegex', triggerRegex);
    const noWhiteSpaceRegex = new RegExp(`\\S+`);
    let start = at;
    let end;
    while (true) {
        end = start;
        if (!start)
            break;
        start = Editor.before(editor, start);
        const charRange = start && Editor.range(editor, start, end);
        const charText = getText(editor, charRange);
        // Match non-whitespace character on before text
        if (!charText.match(noWhiteSpaceRegex)) {
            start = end;
            break;
        }
    }
    // Range from start to cursor
    const range = start && Editor.range(editor, start, at);
    const text = getText(editor, range);
    if (!range || !text.match(triggerRegex))
        return;
    return {
        range,
        textAfterTrigger: text.substring(1),
    };
};