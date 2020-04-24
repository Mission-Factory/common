import React from 'react';
import { formatDate, parseDate } from '../../utils/date';
import { isString } from '../../utils';

type DateFormat = 'MMM d, yyyy' | 'MMM d, yyyy h:mma';

export interface DateProps extends React.HTMLAttributes<HTMLSpanElement> {
  date: string | Date | null | undefined;
  format?: DateFormat;
  showTime?: boolean;
  isTime?: boolean;
}

// Format reference: https://date-fns.org/v2.12.0/docs/format
const DateComponent = React.memo(({ date, format = 'MMM d, yyyy', showTime, isTime, ...rest }: DateProps) => {
  let str;
  const newFormat = showTime ? 'MMM d, yyyy h:mma' : format;
  if (isTime && isString(date)) {
    str = formatDate(new Date(date), 'h:mma');
  } else if (isString(date)) {
    if (date.length === 10 && date.includes('-')) {
      // date is in format: yyyy-MM-dd, parse it and then format it correctly
      str = formatDate(parseDate(date, 'yyyy-MM-dd', new Date()), newFormat);
    } else {
      str = formatDate(new Date(date), newFormat);
    }
  } else if (date === null || date === undefined) {
    str = '-';
  } else {
    str = formatDate(date, newFormat);
  }
  return <span {...rest}>{str}</span>;
});

export default DateComponent;
