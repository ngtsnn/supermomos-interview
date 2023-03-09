import moment, { isMoment } from "moment";

export const timestampToDate = (time: number) => {
  const date = moment(time);
  return date.format("MMMM DD, ddd");
};

export const timestampToTime = (time: number) => {
  const date = moment(time);
  return date.format("HH:mm A");
};
