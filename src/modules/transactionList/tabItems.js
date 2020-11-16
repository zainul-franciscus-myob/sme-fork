export const tabItemIds = {
  journal: 'journalTransaction',
  debitsAndCredits: 'debitsAndCredits',
  findAndRecode: 'findAndRecode',
};

export const mapTab = (
  tab,
  journalCallback,
  debitsAndCreditsCallback,
  findAndRecodeCallback
) => {
  switch (tab) {
    case tabItemIds.journal:
      return journalCallback();
    case tabItemIds.debitsAndCredits:
      return debitsAndCreditsCallback();
    case tabItemIds.findAndRecode:
      return findAndRecodeCallback();
    default:
      return undefined;
  }
};
