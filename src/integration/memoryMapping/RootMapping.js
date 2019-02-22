import BankingMapping from './BankingMapping';
import BusinessMapping from './BusinessMapping';
import ContactMapping from './ContactMapping';
import GeneralJournalMapping from './GeneralJournalMapping';
import IncomeAllocationMapping from './IncomeAllocationMapping';
import NavigationMapping from './NavigationMapping';
import ReceiveMoneyMapping from './ReceiveMoneyMapping';
import SpendMoneyMapping from './SpendMoneyMapping';
import TransactionListMapping from './TransactionListMapping';
import TransferMoneyMapping from './TransferMoneyMapping';

const RootMapping = Object.freeze({
  ...BankingMapping,
  ...BusinessMapping,
  ...GeneralJournalMapping,
  ...SpendMoneyMapping,
  ...ReceiveMoneyMapping,
  ...TransactionListMapping,
  ...TransferMoneyMapping,
  ...ContactMapping,
  ...IncomeAllocationMapping,
  ...NavigationMapping,
});

export default RootMapping;
