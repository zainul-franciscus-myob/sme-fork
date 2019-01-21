import BankingMapping from './BankingMapping';
import BusinessMapping from './BusinessMapping';
import GeneralJournalMapping from './GeneralJournalMapping';
import ReceiveMoneyMapping from './ReceiveMoneyMapping';
import SpendMoneyMapping from './SpendMoneyMapping';
import TransactionListMapping from './TransactionListMapping';

const RootMapping = Object.freeze({
  ...BankingMapping,
  ...BusinessMapping,
  ...GeneralJournalMapping,
  ...SpendMoneyMapping,
  ...ReceiveMoneyMapping,
  ...TransactionListMapping,
});

export default RootMapping;
