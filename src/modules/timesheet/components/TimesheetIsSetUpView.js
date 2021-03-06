import {
  Button,
  ButtonRow,
  Card,
  Checkbox,
  CheckboxGroup,
  Columns,
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
  getActiveJobOptions,
  getDisplayStartStopTimes,
  getEmployeeList,
  getFormattedHours,
  getIsTableLoading,
  getPayItems,
  getRowHours,
  getSelectedDate,
  getSelectedEmployeeId,
  getTimesheetRows,
  getTimesheetTotalHours,
  getWeekDayLabels,
  getWeekDayTotals,
  getWeekStartDate,
} from '../timesheetSelectors';
import EmployeeCombobox from './EmployeeCombobox';
import HoursInput from '../../../components/autoFormatter/HoursInput/HoursInput';
import JobCombobox from '../../../components/combobox/JobCombobox';
import NoMoveWrapper from '../../../components/LineItemTable/NoMoveWrapper';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import styles from './Timesheet.module.css';

const handleComboBoxChange = (name, onChange) => (item) =>
  onChange({
    target: {
      name,
      value: item.id,
    },
  });

const handleHoursInputChange = (handler) => (e) => {
  const { name, rawValue } = e.target;
  handler({ target: { name, value: rawValue } });
};
const handleHoursInputBlur = (index, handler) => (e) => {
  const { name, rawValue } = e.target;
  handler(index, name, rawValue);
};
const sum = (list) => list.reduce((total, value) => total + value, 0);

const TimesheetIsSetUpView = ({
  weekDayLabels,
  weekDayTotals,
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
  onCreateJobClick,
  onHoursBlur,
  isTableLoading,
  activeJobOptions,
}) => {
  const baseTableLabels = [
    'Pay item',
    'Jobs',
    'Notes',
    ...weekDayLabels,
    'Total',
  ];
  const tableLabels = displayStartStopTimes
    ? [...baseTableLabels, 'Start and stop times']
    : baseTableLabels;

  const isEmployeeSelected = selectedEmployeeId;

  const columnConfig = [
    {
      config: [
        {
          columnName: 'Jobs',
          styles: {
            width: '90px',
          },
        },
        {
          columnName: 'Total',
          styles: {
            align: 'right',
            width: '75px',
          },
        },
        {
          columnName: 'Start and stop times',
          styles: {
            width: '150px',
          },
        },
        ...weekDayLabels.map((label) => ({
          columnName: label,
          styles: {
            width: '70px',
            align: 'right',
          },
        })),
      ],
    },
  ];
  const renderRow = (index, data, onChange, labels) => {
    const weekDays = weekDayLabels.map((label, i) => ({
      field: `day${i + 1}`,
      label,
    }));
    const weekDayCells = weekDays.map(({ field, label }) => {
      const value = data[field] && data[field].hours ? data[field].hours : '';
      const readonly = data[field] && data[field].readonly;
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
          numeralIntegerScale={2}
          disabled={readonly || !isEmployeeSelected || isTableLoading}
        />
      );
    });

    const weekDayHours = getRowHours(data);
    const totalHoursNumber = sum(weekDayHours);
    const totalHours =
      totalHoursNumber !== 0 ? getFormattedHours(totalHoursNumber) : '';
    return (
      <LineItemTable.Row id={index} key={data.id} index={index} labels={labels}>
        <Select
          name="payItemId"
          value={data.payItemId ? data.payItemId : ''}
          onChange={onChange}
          label="Pay item"
          hideLabel
          disabled={!isEmployeeSelected || isTableLoading}
        >
          <Select.Option value={null} label=""></Select.Option>
          {payItems.map((payItem) => (
            <Select.Option
              value={payItem.id}
              key={payItem.id}
              label={payItem.name}
            />
          ))}
        </Select>
        <JobCombobox
          label="job"
          onChange={handleComboBoxChange('jobId', onChange)}
          addNewJob={() =>
            onCreateJobClick(handleComboBoxChange('jobId', onChange))
          }
          items={data.jobOptions ? data.jobOptions : activeJobOptions}
          selectedId={data.jobId}
          disabled={!isEmployeeSelected || isTableLoading}
          allowClear
        />
        <TextArea
          name="notes"
          label="Notes"
          value={data.notes || ''}
          onChange={onChange}
          hideLabel
          autoSize
          rows={1}
          disabled={!isEmployeeSelected || isTableLoading}
        />
        {weekDayCells}
        <ReadOnly name="totals" label="totals" hideLabel>
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
            disabled={!isEmployeeSelected || isTableLoading}
          />
        )}
      </LineItemTable.Row>
    );
  };
  return (
    <>
      <Card>
        <div className={styles.filterBar}>
          <Columns type="three">
            <EmployeeCombobox
              testid="employeeSelect"
              employees={employeeList}
              name="selectedEmployee"
              label="Employee"
              width="lg"
              selectedId={selectedEmployeeId}
              onChange={handleComboboxChange(
                'selectedEmployee',
                onEmployeeChange
              )}
            />
            <DatePicker
              name="selectedDate"
              width="lg"
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
          </Columns>
        </div>
        <Separator />
        <NoMoveWrapper>
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
              {weekDayLabels.map((label, index) => (
                <LineItemTable.Totals
                  title={`${label}:`}
                  amount={weekDayTotals[index]}
                />
              ))}
              <LineItemTable.Totals
                totalAmount
                title="Total hours:"
                amount={totalHoursSum}
              />
            </LineItemTable.Total>
          </LineItemTable>
        </NoMoveWrapper>
      </Card>
      <ButtonRow
        secondary={[
          <Button
            key="delete"
            type="secondary"
            onClick={onDeleteClick}
            testid="deleteButton"
            disabled={!isEmployeeSelected || isTableLoading}
          >
            Delete timesheet
          </Button>,
        ]}
        primary={[
          <Button
            key="save"
            onClick={onSaveClick}
            testid="saveButton"
            disabled={!isEmployeeSelected || isTableLoading}
          >
            Save
          </Button>,
        ]}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  weekDayLabels: getWeekDayLabels(state),
  timesheetRows: getTimesheetRows(state),
  employeeList: getEmployeeList(state),
  payItems: getPayItems(state),
  selectedEmployeeId: getSelectedEmployeeId(state),
  weekStartDate: getWeekStartDate(state),
  selectedDate: getSelectedDate(state),
  displayStartStopTimes: getDisplayStartStopTimes(state),
  totalHoursSum: getTimesheetTotalHours(state),
  weekDayTotals: getWeekDayTotals(state),
  activeJobOptions: getActiveJobOptions(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(TimesheetIsSetUpView);
