import {
  Card, DatePicker, Input, LineItemTable, Select, Separator, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmployeeList,
  getLineItems,
  getPayItems,
  getSelectedEmployeeId,
  getWeekDayLabels,
} from '../timesheetSelectors';
import EmployeeCombobox from './EmployeeCombobox';
import FilterBar from '../../../components/Feelix/FilterBar/FilterBar';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';


const TimesheetIsSetUpView = ({
  weekDayLabels,
  lineItems,
  payItems,
  employeeList,
  onEmployeeChange,
  selectedEmployeeId,
}) => {
  const tableLabels = [
    'Pay item',
    'Notes',
    ...weekDayLabels,
    'Total',
  ];

  const columnConfig = [{
    config: weekDayLabels.map(label => ({
      columnName: label,
      styles: {
        width: '75px',
        align: 'right',
      },
    })),
  }];

  const renderRow = (index, data, onChange, labels) => {
    const weekDayCells = weekDayLabels.map((dayLabel, i) => {
      const value = data.days ? data.days[i].hours : '';
      return (
        <Input
          name={dayLabel}
          value={value}
          onChange={onChange}
          hideLabel
          label={dayLabel}
        />
      );
    });

    return (
      <LineItemTable.Row
        id={data.id}
        key={data.id}
        index={index}
        labels={labels}
      >
        <Select
          name="Pay item"
          value={data.payItemId ? data.payItemId : ''}
          onChange={onChange}
        >
          <Select.Option value={null} label={null}></Select.Option>
          {
            payItems.map(payItem => (<Select.Option value={payItem.id} label={payItem.name} />))
          }
        </Select>
        <TextArea
          name="notes"
          label="Notes"
          value={data.notes || ''}
          onChange={onChange}
          hideLabel
          autoSize
          rows={1}
        />
        {weekDayCells}
        <span name="total">todo</span>
      </LineItemTable.Row>
    );
  };
  return (
    <Card>
      <FilterBar>
        <FilterBar.Group>
          <EmployeeCombobox
            testid="employeeSelect"
            employees={employeeList}
            name="selectedEmployee"
            label="Employee"
            width="lg"
            selectedId={selectedEmployeeId}
            onChange={handleComboboxChange('selectedEmployee', onEmployeeChange)}
          />
          <DatePicker
            name="weekStartDate"
            label="Week"
          />
        </FilterBar.Group>
      </FilterBar>
      <Separator />
      <LineItemTable
        testid="timesheetTable"
        data={lineItems}
        labels={tableLabels}
        renderRow={renderRow}
        columnConfig={columnConfig}
        onAddRow={() => { }}
      />
    </Card>
  );
};

const mapStateToProps = state => ({
  weekDayLabels: getWeekDayLabels(state),
  lineItems: getLineItems(state),
  employeeList: getEmployeeList(state),
  payItems: getPayItems(state),
  selectedEmployeeId: getSelectedEmployeeId(state),
});

export default connect(mapStateToProps)(TimesheetIsSetUpView);
