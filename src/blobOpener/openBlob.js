const openBlob = (blob, filename) => {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    window.open(URL.createObjectURL(blob), '_blank');
  }
};

export default openBlob;
