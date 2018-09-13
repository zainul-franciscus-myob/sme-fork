import bankingMapping from './bankingMappings';
import businessMapping from './businessMappings';
import journalMapping from './journalMappings';
import petMapping from './petMappings';

export default Object.freeze(Object.assign(
  petMapping,
  bankingMapping,
  journalMapping,
  businessMapping,
));
