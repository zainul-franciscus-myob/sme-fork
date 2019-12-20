import { format, isValid } from 'date-fns';

const formatDate = (dateStr, formatString) => {
  const date = new Date(dateStr);

  if (!isValid(date)) return undefined;

  return format(date, formatString);
};

export default formatDate;
