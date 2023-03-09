import React, { FC, useState } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import { ReactComponent as ClockIcon } from "@assets/icons/clock.svg";
import type { Moment } from "moment";
import styles from "./style.module.scss";

interface ITimePicker {
  time: string | Moment;
  setTime: (time: string | Moment) => void;
}

export const InputTimePicker: FC<ITimePicker> = (props) => {
  const { time, setTime } = props;

  return (
    <div className="flex items-center text-secondary w-full flex-nowrap">
      <ClockIcon className="mr-2 w-8 h-8 block min-h-[2rem] min-w-[2rem]" />
      <Datetime
        className={styles.timepicker}
        onChange={setTime}
        value={time}
        dateFormat={false}
        strictParsing
      />
    </div>
  );
};
