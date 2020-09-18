const handleContactAutoCompleteChange = (key, handler) => (item) => {
  handler({
    key,
    value: item ? item.id : '',
    contactType: item ? item.contactType : '',
    isReportable: item ? item.isReportable : undefined,
  });
};

export default handleContactAutoCompleteChange;
