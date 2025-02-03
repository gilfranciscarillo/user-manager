import { format, differenceInYears } from "date-fns";

export const SHORT_DATE_FORMAT = "MMM dd, yyyy";

export const getFormattedDate = (dateObj: Date, dateFormat: string): string => {
  return format(dateObj, dateFormat);
};

export const getYearsBetweenCurrent = (fromDate: Date): number => {
  return differenceInYears(new Date(), fromDate);
};
