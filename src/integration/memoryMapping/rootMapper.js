import petMapping from './petMapping';
import bankingMapping from './bankingMapping';

export default Object.freeze(Object.assign(
  bankingMapping, 
  petMapping
));