import { format } from 'date-fns';

const formatDate = (date, formatString) => {
  if (date instanceof Date) {
    return format(date, formatString);
  }

  return undefined;
};

export default formatDate;
