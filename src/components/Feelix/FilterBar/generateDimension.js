function getReactElementPosition(element) {
  const node = element.current || element;
  const parentPos = node.offsetParent;
  return {
    top:
      node.offsetTop
      && parentPos.offsetTop
      && node.offsetTop - parentPos.offsetTop,
    left:
      node.offsetLeft
      && parentPos.offsetLeft
      && node.offsetLeft - parentPos.offsetLeft,
    height: node.offsetHeight,
    width: node.offsetWidth,
  };
}

module.exports = {
  getReactElementPosition,
};
