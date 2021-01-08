import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEsctPercent, getKiwiSaverDetails } from '../StandardPayTabSelector';
import AutoFormatter from '../../../../../../components/autoFormatter/AutoFormatterCore/AutoFormatterWithMessage';

const KiwiSaverRowGroup = ({ tableConfig, kiwiSaverDetails, esctPercent }) => {
  return (
    <>
      <Table.Row key="taxesHeader">
        <Table.RowItem cellRole="heading">KiwiSaver</Table.RowItem>
      </Table.Row>
      <Table.Row key="kiwiSaverEmployeeRow">
        <Table.RowItem {...tableConfig.name} indentLevel={1}>
          Employee contribution
        </Table.RowItem>
        <Table.RowItem {...tableConfig.quantity}></Table.RowItem>
        <Table.RowItem {...tableConfig.rate}>
          <AutoFormatter
            name="kiwiSaverEmployee"
            key="kiwiSaverEmployee"
            label="kiwiSaverEmployee"
            value={`${kiwiSaverDetails.employeeContributionRate}%`}
            textAlign="right"
            hideLabel
            disabled
          />
        </Table.RowItem>
        <Table.RowItem {...tableConfig.amount}>
          <strong>Calculated</strong>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.action}></Table.RowItem>
      </Table.Row>

      <Table.Row key="kiwiSaverEmployerRow">
        <Table.RowItem {...tableConfig.name} indentLevel={1}>
          Employer contribution
        </Table.RowItem>
        <Table.RowItem {...tableConfig.quantity}></Table.RowItem>
        <Table.RowItem {...tableConfig.rate}>
          <AutoFormatter
            value={`${kiwiSaverDetails.employerContributionRate}%`}
            name="kiwiSaverEmployer"
            key="kiwiSaverEmployer"
            label="kiwiSaverEmployer"
            textAlign="right"
            hideLabel
            disabled
          />
        </Table.RowItem>
        <Table.RowItem {...tableConfig.amount}>
          <strong>Calculated</strong>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.action}></Table.RowItem>
      </Table.Row>

      <Table.Row key="esctRow">
        <Table.RowItem {...tableConfig.name} indentLevel={1}>
          Employer superannuation contribution tax (ESCT)
        </Table.RowItem>
        <Table.RowItem {...tableConfig.quantity}></Table.RowItem>
        <Table.RowItem {...tableConfig.rate}>
          <AutoFormatter
            name="esctInput"
            key="esctInput"
            label="esctInput"
            value={`${esctPercent}%`}
            textAlign="right"
            hideLabel
            disabled
          />
        </Table.RowItem>
        <Table.RowItem {...tableConfig.amount}>
          <strong>Calculated</strong>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.action}></Table.RowItem>
      </Table.Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  esctPercent: getEsctPercent(state),
  kiwiSaverDetails: getKiwiSaverDetails(state),
});

export default connect(mapStateToProps)(KiwiSaverRowGroup);
