const isEdge = () => {
  window.navigator.userAgent.includes('Edge');
};

const createObjectUrl = (blob) => {
  const url = URL.createObjectURL(blob);

  return isEdge ? url.replace('blob:') : url;
};

export default createObjectUrl;
