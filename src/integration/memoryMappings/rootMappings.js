import bankingMapping from './bankingMappings';
import businessMapping from './businessMappings';
import journalMapping from './journalMappings';

export default Object.freeze(Object.assign(
  bankingMapping,
  journalMapping,
  businessMapping,
));
