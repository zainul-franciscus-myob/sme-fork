export const findComponentWithTestId = (wrapper, testId, componentName) =>
  wrapper.findWhere(
    (c) => c.prop('testid') === testId && c.name() === componentName
  );

export const findButtonWithTestId = (wrapper, testId) =>
  findComponentWithTestId(wrapper, testId, 'Button');
