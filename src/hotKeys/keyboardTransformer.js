const mergeKeyboardHandlers = (keymap, handlers) =>
  Object.entries(keymap)
    .map(([key, value]) => handlers[key] && { [value]: handlers[key] })
    .filter(Boolean)
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});

const keyboardTransformer = (keymap, handlers) => {
  const transformedKeyboard = mergeKeyboardHandlers(keymap, handlers);
  const finalKeyboard = {};
  Object.keys(transformedKeyboard).forEach((key) => {
    key.split(',').forEach((splitedKey) => {
      finalKeyboard[splitedKey] = transformedKeyboard[key];
    });
  });
  return finalKeyboard;
};

export default keyboardTransformer;
