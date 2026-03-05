import { format, formatDistanceToNowStrict } from "date-fns";

export const dateCreatedFromNow = (date: Date | undefined) => {
  if (!date) {
    throw new Error("Data tidak ada");
  }
  const result = formatDistanceToNowStrict(date, {
    addSuffix: true,
  });
  return result;
};

export const formatDateToHour = (date: Date | undefined) => {
  if (!date) {
    throw new Error("Data tidak ada");
  }
  const hour = format(date, "h");
  const minutes = format(date, "mm");
  const amPm = format(date, "a");
  const result = `${hour}:${minutes} ${amPm}`;

  return result;
};

export const formatCalendarDate = (date: Date | undefined) => {
  if (!date) {
    throw new Error("Data tidak ada");
  }
  const day = format(date, "d");
  const month = format(date, "LLL");
  const year = format(date, "yyyy");
  const result = `${day} ${month} ${year}`;
  return result;
};
