import React, { FC, ReactNode, useMemo, useState } from "react";
import { ReactComponent as DownIcon } from "@assets/icons/chevron-down.svg";
import clsx from "clsx";

export interface IOption<T = any> {
  value: string;
  data: T;
}

interface Props<T = any> {
  value?: IOption<T>;
  options: IOption<T>[];
  selectedClass?: string;
  selectedRender?: ReactNode;
  itemClass?: string;
  itemRender?: ReactNode;
}

const RenderSelected = (selected: IOption, selectedClass?: string, selectedRender?: ReactNode) => {
  if (selectedRender) {
    return selectedRender;
  }

  return (
    <div className={clsx("flex items-center", selectedClass)}>
      <div className="mr-2">{selected.value}</div>
      <DownIcon />
    </div>
  );
};

export const HoverDropdown: FC<Props> = (props) => {
  const { itemRender, options, selectedRender, selectedClass, value } = props;

  const [selected, SetSelected] = useState<IOption>({
    data: "",
    value: "Select",
  });

  const actualSelected = useMemo(() => {
    if (value) return value;
    else return selected;
  }, [selected, value]);

  return (
    <div className="relative">
      <div className="px-3 py-2">
        {RenderSelected(actualSelected, selectedClass, selectedRender)}
      </div>
    </div>
  );
};
