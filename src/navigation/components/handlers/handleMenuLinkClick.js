const handleMenuLinkClick = (handler, url) => (e) => {
  if (handler) {
    e.preventDefault();
    e.stopPropagation();

    // Preventing the user to use special key to navigate away from the page
    // that has handler specified. By Feelix default, using these keys will
    // result in open new window AND original page navigating to the new url.
    const comboKey = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
    if (e.button === 0 && !comboKey) {
      handler(url);
    } else {
      window.open(url);
    }
  }
};

export default handleMenuLinkClick;
