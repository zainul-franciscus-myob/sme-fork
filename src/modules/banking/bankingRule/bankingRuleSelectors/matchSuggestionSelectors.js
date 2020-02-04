import { createSelector } from 'reselect';

import { getRuleType } from './ruleDetailsSelectors';
import RuleTypes from '../RuleTypes';

export const getMatchSectionHeader = createSelector(
  getRuleType,
  (ruleType) => {
    if (ruleType === RuleTypes.bill) {
      return 'Suggest matches from this supplier\'s unpaid bill';
    }
    return 'Suggest matches from this customer\'s unpaid invoices';
  },
);

export const getContactLabel = createSelector(
  getRuleType,
  (ruleType) => {
    if (ruleType === RuleTypes.bill) {
      return 'Supplier';
    }
    return 'Customer';
  },
);
