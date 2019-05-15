import { loadOpenEntry } from './openEntryHandlers';
import { tabIds } from '../tabItems';

// eslint-disable-next-line import/prefer-default-export
export const loadMatchTransaction = (state, action) => loadOpenEntry(
  state, action.index, tabIds.match, {},
);
