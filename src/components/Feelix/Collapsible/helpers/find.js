const basicSelectors = {};
if (typeof document !== 'undefined') {
  basicSelectors.body = document.body;
  basicSelectors.window = window;
  basicSelectors.document = document;
}

const matchesMethodName = (() => {
  if (typeof document !== 'undefined') {
    const { body } = document;
    if (typeof body.matches === 'function') {
      return 'matches';
    } if (typeof body.webkitMatchesSelector === 'function') {
      return 'webkitMatchesSelector'; // webkit
    } if (typeof body.mozMatchesSelector === 'function') {
      return 'mozMatchesSelector'; // mozilla
    } if (typeof body.msMatchesSelector === 'function') {
      return 'msMatchesSelector'; // ie
    } if (typeof body.oMatchesSelector === 'function') {
      return 'oMatchesSelector'; // old opera
    }
  }
  return null;
})();

export default function find(selector, el) {
  if (!selector) {
    return null;
  }

  const hasSelectorProperty = Object.prototype.hasOwnProperty.call(
    basicSelectors,
    selector,
  );
  if (hasSelectorProperty) {
    return basicSelectors[selector];
  }

  // select by id
  if (selector[0] === '#') {
    return document.getElementById(selector.slice(1));
  }

  if (!matchesMethodName) {
    return null;
  }

  let nextEl = el.parentElement;
  while (nextEl) {
    if (nextEl[matchesMethodName](selector)) {
      return nextEl;
    }
    nextEl = nextEl.parentElement;
  }

  // nothing has been found :(
  return null;
}
