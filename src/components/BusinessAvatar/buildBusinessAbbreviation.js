const buildBusinessAbbreviation = (businessName = '') =>
  businessName
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(/\s+/, 2)
    .reduce((a, b) => {
      const formattedB = b.toUpperCase();
      if (formattedB === 'PTY' || formattedB === 'LTD') {
        return a;
      }
      return formattedB.length ? a + [...formattedB][0] : a;
    }, '');

export default buildBusinessAbbreviation;
