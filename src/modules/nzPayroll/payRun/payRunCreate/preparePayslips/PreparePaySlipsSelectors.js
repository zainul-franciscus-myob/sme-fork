import { createSelector } from 'reselect';

export const getPreparePaySlips = (state) => state.preparePaySlips;

export const getPrintPaySlipEmployees = createSelector(
  getPreparePaySlips,
  ({ printPaySlipEmployees }) => printPaySlipEmployees
);
