const openBlob = (blob, filename, targetAttribute = '_blank') => {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    window.open(URL.createObjectURL(blob), targetAttribute);
  }
};

export default openBlob;
