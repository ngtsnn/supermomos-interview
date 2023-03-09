import React, { ChangeEvent, FC, forwardRef, useRef, useState } from "react";

const defaultVal = "Untitled Event";

const formatValue = (val: string) => {
  const endWithSpace = val.endsWith(" ");
  const trimed = val.trim();
  return endWithSpace ? trimed + " " : trimed;
};

const TitleInput = forwardRef<HTMLTextAreaElement, unknown>((_, ref) => {
  const mirrorRef = useRef<HTMLSpanElement>(null);

  const resizeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e;
    target.value = formatValue(target.value);
    mirrorRef.current &&
      (mirrorRef.current.innerHTML =
        target.value.length > defaultVal.length ? target.value : defaultVal);
    const height = mirrorRef.current?.offsetHeight || 0;
    target.style.height = height + 20 + "px";
  };

  return (
    <div className="relative w-[120%]">
      <div className="absolute z-[1] py-2">
        <span
          className="p-2 pr-2 text-5xl font-bold min-h-[4rem] min-w-[22rem] text-transparent bg-purple leading-[74px] box-decoration-clone"
          ref={mirrorRef}
        >
          {defaultVal}
        </span>
      </div>
      <textarea
        ref={ref}
        className="border-0 outline-none resize-none text-white font-bold text-5xl p-2 bg-transparent z-[1] leading-[74px] relative w-full box-decoration-clone overflow-hidden"
        onChange={resizeInput}
        placeholder={defaultVal}
        defaultValue={defaultVal}
        style={{ height: 90 }}
      />
    </div>
  );
});

export default TitleInput;
