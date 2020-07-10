const browsersList = (os) => {
  const baseList = `
    <a href="https://www.google.com/chrome/">Google Chrome</a>,
    <a href="https://www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a>,
  `;

  if (os === 'iOS' || os === 'Mac OS') {
    return `
      ${baseList}
      <a href="https://www.apple.com/safari/">Safari</a>
    `;
  }

  if (os.split(' ')[0] === 'Windows') {
    return `
      ${baseList}
      <a href="https://www.microsoft.com/en-us/edge">Microsoft Edge</a>
    `;
  }

  return baseList;
};

const NotSupportedPage = (
  os
) => `<div style="padding:2.4rem;margin-top:2.4rem;text-align:center">
  <img
    src="assets/something-went-wrong.svg"
    alt="something went wrong" />
  <h3>Your browser version isn’t supported.</h3>
  <h5 style="margin-top:2.4rem;margin-bottom:0.4rem">
    Here’s what works
    ${browsersList(os)}
  </h5>
</div>`;

export default NotSupportedPage;
