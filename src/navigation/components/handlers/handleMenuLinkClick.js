const navigate = ({ url, target }) => {
  window.open(url, target);
};

const handleMenuLinkClick = (handler, url, target = '_self') => (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (handler) {
    // Preventing the user to use special key to navigate away from the page
    // that has handler specified. By Feelix default, using these keys will
    // result in open new window AND original page navigating to the new url.
    const comboKey = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
    if (e.button === 0 && !comboKey && target !== '_blank') {
      handler(url);
    } else {
      navigate({ url, target });
    }
  } else {
    navigate({ url, target });
  }
};

export default handleMenuLinkClick;
