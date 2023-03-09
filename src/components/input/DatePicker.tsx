import React, { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as CalendarIcon } from "@assets/icons/calendar.svg";

interface IDatePicker {
  date: Date | null;
  setDate: (date: Date | null) => void;
}

export const InputDatePicker: FC<IDatePicker> = (props) => {
  const { date, setDate } = props;

  return (
    <div className="flex items-center text-secondary w-full flex-nowrap">
      <CalendarIcon className="mr-2 w-8 h-8 block min-h-[2rem] min-w-[2rem]" />
      <DatePicker
        placeholderText="Date"
        className="outline-none rounded-md px-1 placeholder:font-bold placeholder:text-black w-full h-8 text-2xl"
        selected={date}
        onChange={(date) => setDate(date)}
      />
    </div>
  );
};
