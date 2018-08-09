import petMapping from './petMapping';
import bankingMapping from './bankingMapping';
import journalMapping from './journalMapping';

export default Object.freeze(Object.assign(
  bankingMapping,
  petMapping,
  journalMapping
));
