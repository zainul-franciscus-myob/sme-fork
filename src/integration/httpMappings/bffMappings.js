import bankingMappings from './bankingMappings';
import journalMappings from './journalMappings';
import petMappings from './petMappings';

export default Object.freeze(Object.assign(
  petMappings,
  bankingMappings,
  journalMappings,
));
