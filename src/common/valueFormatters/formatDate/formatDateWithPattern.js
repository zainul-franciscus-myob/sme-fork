import { format, isValid } from 'date-fns';

const formatDateWithPattern = (dateFormat) => (dateStr) => {
  const date = new Date(dateStr);

  if (!isValid(date)) return '';

  return format(date, dateFormat);
};

export default formatDateWithPattern;
