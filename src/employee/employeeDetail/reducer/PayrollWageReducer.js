import formatNumberWithDecimalScaleRange from '../../../valueFormatters/formatNumberWithDecimalScaleRange';

const formatAnnualSalary = annualSalary => Number(annualSalary).toFixed(2);
const formatHourlyRate = hourlyRate => formatNumberWithDecimalScaleRange(hourlyRate, 2, 4);
const formatPayPeriodHours = payPeriodHours => formatNumberWithDecimalScaleRange(
  payPeriodHours, 2, 3,
);

export const loadWagePayrollDetails = (stateWage, actionWage) => ({
  ...stateWage,
  ...actionWage,
  annualSalary: formatAnnualSalary(actionWage.annualSalary),
  hourlyRate: formatHourlyRate(actionWage.hourlyRate),
  payPeriodHours: formatPayPeriodHours(actionWage.payPeriodHours),
});

const setPayrollWageState = (state, partialWage) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    wage: {
      ...state.payrollDetails.wage,
      ...partialWage,
    },
  },
  isPageEdited: true,
});

export const addPayrollWagePayItem = (state, action) => {
  const updatedPayItems = [
    ...state.payrollDetails.wage.allocatedWagePayItems,
    { id: action.id, type: action.type },
  ];
  const partialWage = { allocatedWagePayItems: updatedPayItems };

  return setPayrollWageState(state, partialWage);
};

export const removePayrollWagePayItem = (state, action) => {
  const updatedPayItems = state.payrollDetails.wage.allocatedWagePayItems
    .filter(payItem => payItem.id !== action.id);
  const partialWage = { allocatedWagePayItems: updatedPayItems };

  return setPayrollWageState(state, partialWage);
};

export const updatePayrollWageDetail = (state, action) => {
  const partialWage = {
    [action.key]: action.value,
  };
  return setPayrollWageState(state, partialWage);
};

export const updatePayrollWagePayBasis = (state, { value }) => {
  const { wage } = state.payrollDetails;
  const { baseHourlyWagePayItemId, baseSalaryWagePayItemId, wagePayItems } = state;
  const idToAdd = value === 'Salary' ? baseSalaryWagePayItemId : baseHourlyWagePayItemId;

  const payItemToAdd = wagePayItems.find(({ id }) => id === idToAdd);
  const allocatedWagePayItems = [
    ...wage.allocatedWagePayItems.filter(
      ({ id }) => id !== baseHourlyWagePayItemId && id !== baseSalaryWagePayItemId,
    ),
    {
      id: payItemToAdd.id,
      type: payItemToAdd.type,
    },
  ];

  const partialWage = {
    allocatedWagePayItems,
    selectedPayBasis: value,
  };

  return setPayrollWageState(state, partialWage);
};

const payCycleMultiplier = {
  Weekly: 52,
  Fortnightly: 26,
  TwiceAMonth: 24,
  Monthly: 12,
};

const calculateAnnualSalary = (hourlyRate, payPeriodHours, payCycle) => hourlyRate
  * payPeriodHours * payCycleMultiplier[payCycle];

const calculateHourlyRate = (annualSalary, payPeriodHours, payCycle) => (payPeriodHours > 0
  ? annualSalary / (payPeriodHours * payCycleMultiplier[payCycle])
  : 0);

export const updatePayrollWageHourlyRate = (state, { value }) => {
  const { payPeriodHours, selectedPayCycle } = state.payrollDetails.wage;
  const hourlyRate = Number(value);
  const numPayPeriodHours = Number(payPeriodHours);
  const annualSalary = calculateAnnualSalary(hourlyRate, numPayPeriodHours, selectedPayCycle);

  const partialWage = {
    annualSalary: formatAnnualSalary(annualSalary),
    hourlyRate: formatHourlyRate(value),
  };
  return setPayrollWageState(state, partialWage);
};

export const updatePayrollWageAnnualSalary = (state, { value }) => {
  const { payPeriodHours, selectedPayCycle } = state.payrollDetails.wage;
  const annualSalary = Number(value);
  const numPayPeriodHours = Number(payPeriodHours);
  const hourlyRate = calculateHourlyRate(annualSalary, numPayPeriodHours, selectedPayCycle);

  const partialWage = {
    annualSalary: formatAnnualSalary(value),
    hourlyRate: formatHourlyRate(hourlyRate),
  };
  return setPayrollWageState(state, partialWage);
};

const updateHoursAndPayAmounts = (state, selectedPayCycle, payPeriodHours) => {
  const {
    hourlyRate, annualSalary, selectedPayBasis,
  } = state.payrollDetails.wage;

  const updatedAnnualSalary = selectedPayBasis === 'Hourly'
    ? formatAnnualSalary(
      calculateAnnualSalary(Number(hourlyRate), payPeriodHours, selectedPayCycle),
    )
    : annualSalary;

  const updatedHourlyRate = selectedPayBasis === 'Salary'
    ? formatHourlyRate(
      calculateHourlyRate(Number(annualSalary), payPeriodHours, selectedPayCycle),
    )
    : hourlyRate;


  const partialWage = {
    selectedPayCycle,
    annualSalary: updatedAnnualSalary,
    hourlyRate: updatedHourlyRate,
    payPeriodHours: formatPayPeriodHours(payPeriodHours),
  };
  return setPayrollWageState(state, partialWage);
};

export const updatePayrollWageHoursInPayCycle = (state, { value }) => updateHoursAndPayAmounts(
  state, state.payrollDetails.wage.selectedPayCycle, Number(value),
);

export const updatePayrollWagePayCycle = (state, { value }) => {
  const { payPeriodHours, selectedPayCycle } = state.payrollDetails.wage;
  const updatedPayPeriodHours = Number(payPeriodHours)
    * payCycleMultiplier[selectedPayCycle] / payCycleMultiplier[value];

  return updateHoursAndPayAmounts(state, value, updatedPayPeriodHours);
};
