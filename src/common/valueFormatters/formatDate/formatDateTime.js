import { format, parseISO } from 'date-fns';

const formatDateTime = dateStr => format(parseISO(dateStr), 'dd/MM/yyyy h:mmaa').toLowerCase();

export default formatDateTime;
