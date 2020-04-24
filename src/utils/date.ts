import * as date from './date'; // import this file into itself to default export everything
export default date;
import { format, parse } from 'date-fns';

export { format as formatDate, parse as parseDate };
