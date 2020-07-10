import {
  FieldGroup,
  FormHorizontal,
  Icons,
  ReadOnly,
  Select,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableLoading,
  getTaxPayItemAccounts,
  getTaxPayItemAtoReportingCategoryList,
  getTaxPayItemDetail,
} from '../PayItemListSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import PageView from '../../../../components/PageView/PageView';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import style from './TaxPayItemView.module.css';

const TaxPayItemView = ({
  isLoading,
  taxPayItemDetail,
  accounts,
  atoReportCategoryList,
  listeners: { onTaxDetailChange },
}) => {
  const view = (
    <div className={style.formWidth}>
      <FormHorizontal>
        <FieldGroup label="PAYG withholding">
          <AccountCombobox
            label="Linked payables account"
            hideLabel={false}
            items={accounts}
            selectedId={taxPayItemDetail.accountId}
            onChange={handleComboboxChange('accountId', onTaxDetailChange)}
            labelAccessory={
              <Tooltip triggerContent={<Icons.Info />}>
                This account will track the amount of PAYG that is withheld from
                employees. We recommend using the default one we suggested for
                you.
              </Tooltip>
            }
          />
          <Select
            name="atoReportingCategory"
            label="ATO reporting category"
            value={taxPayItemDetail.atoReportingCategory}
            onChange={handleSelectChange(onTaxDetailChange)}
            labelAccessory={
              <Tooltip triggerContent={<Icons.Info />}>
                Select the ATO reporting category for Single Touch Payroll.
              </Tooltip>
            }
          >
            {atoReportCategoryList.map((category) => (
              <Select.Option
                key={category.value}
                value={category.value}
                label={category.name}
              />
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup label="Tax table information">
          <ReadOnly
            name="revisionDate"
            label="Tax table revision date"
            labelAccessory={
              <Tooltip triggerContent={<Icons.Info />}>
                The date that the tax tables were last loaded into your
                software.
              </Tooltip>
            }
          >
            {taxPayItemDetail.revisionDate}
          </ReadOnly>
        </FieldGroup>
      </FormHorizontal>
    </div>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = (state) => ({
  isLoading: getIsTableLoading(state),
  taxPayItemDetail: getTaxPayItemDetail(state),
  accounts: getTaxPayItemAccounts(state),
  atoReportCategoryList: getTaxPayItemAtoReportingCategoryList(state),
});

export default connect(mapStateToProps)(TaxPayItemView);
