import BankingMapping from './BankingMapping';
import BusinessMapping from './BusinessMapping';
import GeneralJournalMapping from './GeneralJournalMapping';
import SpendMoneyMapping from './SpendMoneyMapping';

const RootMapping = Object.freeze({
  ...BankingMapping,
  ...BusinessMapping,
  ...GeneralJournalMapping,
  ...SpendMoneyMapping,
});

export default RootMapping;
