import { addCommasInPlace, removeCommas } from './formatter';

const getNewCursorPosition = ({
  endPosition,
  oldValue,
  value,
}) => {
  const valueWithoutCommas = removeCommas(value);
  const valueWithCommas = addCommasInPlace(valueWithoutCommas);

  const isNotAddingOrRemovingComma = valueWithCommas.length === value.length;
  const isCommaBeingAdded = valueWithoutCommas.length > oldValue.length;
  const isCommaBeingDeleted = oldValue.length >= valueWithCommas.length;
  const isCursorAtBeginning = endPosition === 0;

  if (isNotAddingOrRemovingComma) {
    return endPosition;
  } if (isCommaBeingAdded) {
    const numberOfCommasToAdd = valueWithCommas.length - value.length;
    return endPosition + numberOfCommasToAdd;
  } if (isCommaBeingDeleted && !isCursorAtBeginning) {
    /*
      For understanding of which scenarios this branching handles,
      look at `edge cases` in `getNewCursorPosition.test.js`
    */
    if (value.length < valueWithCommas.length) {
      return endPosition;
    }
    return endPosition - 1;
  }
  return endPosition;
};

export default getNewCursorPosition;
