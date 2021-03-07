/**
 * input => editor JSON
 * output => Boolean if any of text property has value
*/

const isContainText = (valueChildren) => {
  const childrensLen = valueChildren.length
  for(let i=0; i<=childrensLen-1; i++) {
    const child = valueChildren[i]
    if(child.text && child.text.length > 0) {
      return true
    }
    else if(child.children) {
      return isContainText(child.children);
    }
  }
  return false
}

export default isContainText