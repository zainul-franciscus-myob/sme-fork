import hotkeys from 'hotkeys-js';

export const ALL_EDITABLE_CONTENT_SCOPE = 'allOpen';

/* 
  This file has been copied over from the `hotkeys-js` package. The purpose of this function is to 
  determine when a hotkey should be executed. The default behaviour is that hotkeys will NOT 
  be triggered on INPUT, TEXTAREA and SELECT elements. 
*/
export default (event) => {
  const target = event.target || event.srcElement;
  const { tagName } = target;
  let flag = true; // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>

  /* 
  We've added the below lines to enable the user to be able to trigger hotkeys on the INPUT, 
  TEXTAREA and SELECT elements as this is a requirement for the banking page.
  */
  if (hotkeys.getScope() === ALL_EDITABLE_CONTENT_SCOPE) {
    return true;
  }
  if (
    target.isContentEditable ||
    ((tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') &&
      !target.readOnly)
  ) {
    flag = false;
  }
  return flag;
};
