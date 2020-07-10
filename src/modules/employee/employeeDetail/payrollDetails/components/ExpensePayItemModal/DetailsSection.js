import { FieldGroup, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLinkedExpenseAccountId,
  getLinkedExpenseAccountOptions,
  getLinkedPayablesAccountId,
  getLinkedPayablesAccountOptions,
  getName,
} from '../../selectors/ExpensePayItemModalSelectors';
import AccountCombobox from '../../../../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';

const DetailsSection = ({
  name,
  linkedExpenseAccountOptions,
  linkedPayablesAccountOptions,
  linkedExpenseAccountId,
  linkedPayablesAccountId,
  onChangeExpensePayItemInput,
}) => (
  <FieldGroup label="Details">
    <Input
      label="Name"
      name="name"
      value={name}
      onChange={handleInputChange(onChangeExpensePayItemInput)}
      maxLength={31}
    />
    <AccountCombobox
      label="Linked expense account"
      hideLabel={false}
      items={linkedExpenseAccountOptions}
      selectedId={linkedExpenseAccountId}
      onChange={handleComboboxChange(
        'linkedExpenseAccountId',
        onChangeExpensePayItemInput
      )}
    />
    <AccountCombobox
      label="Linked payables account"
      hideLabel={false}
      items={linkedPayablesAccountOptions}
      selectedId={linkedPayablesAccountId}
      onChange={handleComboboxChange(
        'linkedPayablesAccountId',
        onChangeExpensePayItemInput
      )}
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  name: getName(state),
  linkedExpenseAccountOptions: getLinkedExpenseAccountOptions(state),
  linkedPayablesAccountOptions: getLinkedPayablesAccountOptions(state),
  linkedExpenseAccountId: getLinkedExpenseAccountId(state),
  linkedPayablesAccountId: getLinkedPayablesAccountId(state),
});

export default connect(mapStateToProps)(DetailsSection);
