import {
  LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
  RECODE,
  SORT_AND_FILTER_FIND_AND_RECODE_LIST,
} from '../FindAndRecodeIntents';
import sortAndFilterFindAndRecodeList from './data/sortAndFilterFindAndRecodeList.json';
import success from './data/success.json';

const MemoryFindAndRecodeMapping = {
  [LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE]: ({ onSuccess }) =>
    onSuccess(sortAndFilterFindAndRecodeList),
  [SORT_AND_FILTER_FIND_AND_RECODE_LIST]: ({ onSuccess }) =>
    onSuccess(sortAndFilterFindAndRecodeList),
  [RECODE]: ({ onSuccess }) => onSuccess(success),
};

export default MemoryFindAndRecodeMapping;
