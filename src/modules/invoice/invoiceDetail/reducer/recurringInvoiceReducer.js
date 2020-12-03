/* eslint-disable import/prefer-default-export */
export const updateRecurringScheduleDetail = (state, { key, value }) => ({
  ...state,
  recurringSchedule: {
    ...state.recurringSchedule,
    [key]: value,
  },
});
