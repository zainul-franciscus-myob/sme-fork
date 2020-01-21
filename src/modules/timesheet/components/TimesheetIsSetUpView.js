import {
  Button,
  ButtonRow,
  Card,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  LineItemTable,
  ReadOnly,
  Select,
  Separator,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDisplayStartStopTimes,
  getEmployeeList,
  getFormattedHours,
  getPayItems,
  getRowHours,
  getSelectedDate,
  getSelectedEmployeeId,
  getTimesheetRows,
  getTimesheetTotalHours,
  getWeekDayLabels,
  getWeekStartDate,
} from '../timesheetSelectors';
import EmployeeCombobox from './EmployeeCombobox';
import FilterBar from '../../../components/Feelix/FilterBar/FilterBar';
import HoursInput from '../../../components/autoFormatter/HoursInput/HoursInput';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';

const handleHoursInputChange = handler => (e) => {
  const { name, rawValue } = e.target;
  handler({ target: { name, value: rawValue } });
};
const handleHoursInputBlur = (index, handler) => (e) => {
  const { name, rawValue } = e.target;
  handler(index, name, rawValue);
};
const sum = (list => list.reduce((total, value) => (total + value), 0));

const TimesheetIsSetUpView = ({
  weekDayLabels,
  timesheetRows,
  payItems,
  employeeList,
  onEmployeeChange,
  selectedEmployeeId,
  weekStartDate,
  selectedDate,
  totalHoursSum,
  displayStartStopTimes,
  onSelectedDateChange,
  onSaveClick,
  onDeleteClick,
  onRowChange,
  onRemoveRow,
  onAddRow,
  onDisplayStartStopTimesChange,
  onHoursBlur,
}) => {
  const baseTableLabels = [
    'Pay item',
    'Notes',
    ...weekDayLabels,
    'Total',
  ];
  const tableLabels = displayStartStopTimes
    ? [...baseTableLabels, 'Start and stop times']
    : baseTableLabels;

  const columnConfig = [{
    config: [
      {
        columnName: 'Total',
        styles: {
          align: 'right',
          width: '100px',
        },
      },
      {
        columnName: 'Start and stop times',
        styles: {
          width: '150px',
        },
      },
      ...weekDayLabels.map(label => ({
        columnName: label,
        styles: {
          width: '75px',
          align: 'right',
        },
      })),
    ],
  }];
  const renderRow = (index, data, onChange, labels) => {
    const weekDays = weekDayLabels.map((label, i) => ({
      field: `day${i + 1}`,
      label,
    }));
    const weekDayCells = weekDays.map(({ field, label }) => {
      const value = data[field] && data[field].hours
        ? data[field].hours
        : '';
      return (
        <HoursInput
          name={field}
          value={value}
          onChange={handleHoursInputChange(onChange)}
          onBlur={handleHoursInputBlur(index, onHoursBlur)}
          hideLabel
          label={label}
          key={field}
          decimalScale={2}
        />
      );
    });

    const weekDayHours = getRowHours(data);
    const totalHoursNumber = sum(weekDayHours);
    const totalHours = totalHoursNumber !== 0 ? getFormattedHours(totalHoursNumber) : '';
    return (
      <LineItemTable.Row
        id={index}
        key={index}
        index={index}
        labels={labels}
      >
        <Select
          name="payItemId"
          value={data.payItemId ? data.payItemId : ''}
          onChange={onChange}
          label="Pay item"
          hideLabel
        >
          <Select.Option value={null} label=""></Select.Option>
          {payItems.map(payItem => (
            <Select.Option value={payItem.id} key={payItem.id} label={payItem.name} />
          ))}
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
        <ReadOnly
          name="totals"
          label="totals"
          hideLabel
        >
          {totalHours}
        </ReadOnly>
        {displayStartStopTimes && (
          <TextArea
            name="startStopDescription"
            label="Start and stop times"
            hideLabel
            autoSize
            rows={1}
            onChange={onChange}
            value={data.startStopDescription || ''}
          />
        )}
      </LineItemTable.Row>
    );
  };
  return (
    <>
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
              name="selectedDate"
              label={weekStartDate ? `Week of ${weekStartDate}` : 'Week'}
              value={selectedDate}
              onSelect={onSelectedDateChange}
            />
            <CheckboxGroup
              label="Display start and stop times"
              hideLabel
              renderCheckbox={() => (
                <Checkbox
                  name="displayStartStopTimes"
                  label="Display start and stop times"
                  onChange={onDisplayStartStopTimesChange}
                  checked={displayStartStopTimes}
                />
              )}
            />
          </FilterBar.Group>
        </FilterBar>
        <Separator />
        <LineItemTable
          testid="timesheetTable"
          data={timesheetRows}
          labels={tableLabels}
          renderRow={renderRow}
          columnConfig={columnConfig}
          onRowChange={onRowChange}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
        >
          <LineItemTable.Total>
            <LineItemTable.Totals
              totalAmount
              title="Total hours:"
              amount={String(totalHoursSum)}
            />
          </LineItemTable.Total>
        </LineItemTable>
      </Card>
      <ButtonRow
        secondary={[
          <Button
            key="delete"
            type="secondary"
            onClick={onDeleteClick}
            testid="deleteButton"
            disabled={!selectedEmployeeId}
          >
          Delete timesheet
          </Button>,
        ]}
        primary={[
          <Button key="copy" type="secondary">Copy from previous</Button>,
          <Separator direction="vertical" />,
          <Button
            key="save"
            onClick={onSaveClick}
            testid="saveButton"
            disabled={!selectedEmployeeId}
          >
            Save
          </Button>,
        ]}
      />
    </>
  );
};

const mapStateToProps = state => ({
  weekDayLabels: getWeekDayLabels(state),
  timesheetRows: getTimesheetRows(state),
  employeeList: getEmployeeList(state),
  payItems: getPayItems(state),
  selectedEmployeeId: getSelectedEmployeeId(state),
  weekStartDate: getWeekStartDate(state),
  selectedDate: getSelectedDate(state),
  displayStartStopTimes: getDisplayStartStopTimes(state),
  totalHoursSum: getTimesheetTotalHours(state),
});

export default connect(mapStateToProps)(TimesheetIsSetUpView);
