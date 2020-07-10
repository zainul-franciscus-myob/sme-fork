const openBlob = ({
  blob,
  filename,
  targetAttribute = '_blank',
  shouldDownload,
}) => {
  // For Microsoft Edge
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);

    // For other browsers
  } else {
    const dataURL = URL.createObjectURL(blob);

    // For file formats that are displayable, the browser ignores the `Content-Disposition`
    // and forces display the files on the browser.
    // This is a way to make the browser download a file when it needs to be downloaded.
    if (shouldDownload) {
      const dataButton = document.createElement('a');
      dataButton.setAttribute('download', filename);
      dataButton.setAttribute('href', dataURL);

      document.body.appendChild(dataButton);
      dataButton.click();
      document.body.removeChild(dataButton);
    } else {
      window.open(dataURL, targetAttribute);
    }
  }
};

export default openBlob;
