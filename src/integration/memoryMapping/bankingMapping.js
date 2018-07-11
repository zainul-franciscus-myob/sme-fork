import * as BankingIntents from "../../banking/BankingIntents";
import transactions from '../data/transactions'

const readTransactions = (onSuccess, onFailure) => {
  onSuccess(transactions);
};

const intentMapping = {
  [BankingIntents.LOAD_TRANSACTIONS]: readTransactions
};

export default intentMapping;
