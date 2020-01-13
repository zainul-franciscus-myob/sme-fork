export const getIsUpgradeModalShowing = state => (
  state.monthlyLimit && state.monthlyLimit.used >= state.monthlyLimit.limit
);

export const getMonthlyLimit = ({ monthlyLimit }) => monthlyLimit;
