import BankingMapping from './BankingMapping';
import BusinessMapping from './BusinessMapping';
import GeneralJournalMapping from './GeneralJournalMapping';

const RootMapping = Object.freeze({
  ...BankingMapping,
  ...BusinessMapping,
  ...GeneralJournalMapping,
});

export default RootMapping;
