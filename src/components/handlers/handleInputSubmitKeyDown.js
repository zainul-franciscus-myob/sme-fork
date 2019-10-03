const handleInputSubmitKeyDown = handler => (e) => {
  if (e.key === 'Enter') {
    handler();
  }
};

export default handleInputSubmitKeyDown;
