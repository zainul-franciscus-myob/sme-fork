import {
  Button,
  Field,
  FieldGroup,
  FormHorizontal,
  Icons,
  Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCreateSuperChoiceFormLink,
  getEmployeeMembershipNumber,
  getSelectedSuperFundId,
  getSuperFundOptions,
} from '../../selectors/PayrollSuperSelectors';
import SuperFundCombobox from '../../../../../../components/combobox/SuperFundCombobox';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';
import styles from './PayrollDetailSuperannuation.module.css';

const openNewTab = url => () => window.open(url);

const PayrollDetailSuperannuationDetails = ({
  selectedSuperFundId,
  superFundOptions,
  employeeMembershipNumber,
  createSuperChoiceFormLink,
  onUpdatePayrollDetailSuperannuationDetails,
  onOpenSuperFundModal,
}) => (
  <div className={styles.formWidth}>
    <FormHorizontal>
      <FieldGroup label="Details">
        <SuperFundCombobox
          label="Superannuation fund"
          hideLabel={false}
          items={superFundOptions}
          selectedId={selectedSuperFundId}
          onChange={handleComboboxChange(
            'selectedSuperFundId',
            onUpdatePayrollDetailSuperannuationDetails,
          )}
          allowClearSelection
          addNewItem={{
            label: 'Create superannuation fund',
            onAddNew: onOpenSuperFundModal,
          }}
        />
        <Input
          label="Employee membership number"
          name="employeeMembershipNumber"
          value={employeeMembershipNumber}
          maxLength={17}
          onChange={handleInputChange(
            onUpdatePayrollDetailSuperannuationDetails,
          )}
        />
        <Field
          label=""
          renderField={() => (
            <Button
              type="link"
              icon={<Icons.OpenExternalLink />}
              iconLeft
              onClick={openNewTab(createSuperChoiceFormLink)}
            >
              Create super choice form
            </Button>
          )}
        />
      </FieldGroup>
    </FormHorizontal>
  </div>
);

const mapStateToProps = state => ({
  selectedSuperFundId: getSelectedSuperFundId(state),
  superFundOptions: getSuperFundOptions(state),
  employeeMembershipNumber: getEmployeeMembershipNumber(state),
  createSuperChoiceFormLink: getCreateSuperChoiceFormLink(),
});

export default connect(mapStateToProps)(PayrollDetailSuperannuationDetails);
