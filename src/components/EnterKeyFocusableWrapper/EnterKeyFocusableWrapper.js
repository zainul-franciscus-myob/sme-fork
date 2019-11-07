import React from 'react';

const defaultSelectors = 'input[type=text], textarea';

const EnterKeyFocusableWrapper = ({
  selectors = defaultSelectors,
  renderContent,
}) => {
  const wrapper = React.createRef();

  const hasNextSibling = (index, focusableElements) => index < focusableElements.length - 1;

  const focusNextElement = (current) => {
    const focusableElements = wrapper.current.querySelectorAll(selectors);

    focusableElements.forEach((element, index) => {
      if (element === current && hasNextSibling(index, focusableElements)) {
        focusableElements[index + 1].focus();
      }
    });
  };

  const onKeyDown = (e) => {
    const { key, target } = e;

    if (key === 'Enter') {
      e.preventDefault();
      focusNextElement(target);
    }
  };

  return (
    <div ref={wrapper}>
      {renderContent(onKeyDown)}
    </div>
  );
};

export default EnterKeyFocusableWrapper;
