import bankingMapping from './bankingMapping';
import journalMapping from './journalMapping';
import petMapping from './petMapping';

export default Object.freeze(Object.assign(
  bankingMapping,
  petMapping,
  journalMapping,
));
