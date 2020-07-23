const SMALLER = -1;
const BIGGER = 1;

const wagePayItemComparator = (a, b, baseWageIds) => {
  if (baseWageIds.includes(b.payItemId)) {
    return BIGGER;
  }
  if (baseWageIds.includes(a.payItemId)) {
    return SMALLER;
  }

  if (a.payBasis === 'Hourly' && b.payBasis === 'Salary') return SMALLER;
  if (b.payBasis === 'Hourly' && a.payBasis === 'Salary') return BIGGER;

  return a.name.localeCompare(b.name);
};

const sortPayItems = ({
  payItems,
  baseSalaryWagePayItemId,
  baseHourlyWagePayItemId,
}) =>
  payItems.sort((a, b) =>
    wagePayItemComparator(a, b, [
      baseSalaryWagePayItemId,
      baseHourlyWagePayItemId,
    ])
  );

export default sortPayItems;
