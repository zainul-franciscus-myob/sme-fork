import { FieldGroup, Table, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import EarningsRowGroup from './EarningsRowGroup';
import KiwiSaverRowGroup from './KiwiSaverRowGroup';
import TaxesRowGroup from './TaxesRowGroup';
import style from './PayItemsTable.module.css';
import tableConfig from './PayItemsTableConfig';

const PayItemsTable = ({ onWageDetailsChange }) => {
  return (
    <FieldGroup label="All allocated pay items" className={style.payItemForm}>
      <Table>
        <Table.Header>
          <Table.HeaderItem {...tableConfig.name}> Name </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.quantity}>
            Quantity{' '}
            <Tooltip>
              For pay items that are not automatically calculated, enter the
              hours the employee usually works in a pay cycle. You can change
              the hours when processing the pays.
            </Tooltip>
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.rate}>Rate ($)</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.amount}>
            Amount ($){' '}
            <Tooltip>
              For pay items that are not automatically calculated, enter the
              amounts that are usually paid or deducted each pay. You can change
              the amount when processing the pays.
            </Tooltip>
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.action}></Table.HeaderItem>
        </Table.Header>
        <Table.Body>
          <EarningsRowGroup
            tableConfig={tableConfig}
            onWageDetailsChange={onWageDetailsChange}
          />
          <TaxesRowGroup tableConfig={tableConfig} />
          <KiwiSaverRowGroup tableConfig={tableConfig} />
        </Table.Body>
      </Table>
    </FieldGroup>
  );
};

export default PayItemsTable;
