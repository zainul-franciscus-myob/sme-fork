export const getStartPayRun = (state) => state.startPayRun;

export const getRegularPayCycleOptions = (state) =>
  state.startPayRun.regularPayCycleOptions || [];

export const getCreateDraftPayRunRequestContent = (state) => ({
  ...state.startPayRun.currentEditingPayRun,
});
