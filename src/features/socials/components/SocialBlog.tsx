import React, { FC } from "react";
import type { Social } from "@interfaces/social";
import { timestampToDate, timestampToTime } from "@utils/time";

import { ReactComponent as LocationIcon } from "@assets/icons/location.svg";
import { ReactComponent as PeopleIcon } from "@assets/icons/people.svg";
import { ReactComponent as MoneyIcon } from "@assets/icons/money.svg";
import { ReactComponent as CalendarIcon } from "@assets/icons/calendar.svg";
import { ReactComponent as ClockIcon } from "@assets/icons/clock.svg";

interface Props {
  social: Social;
}

const SocialBlog: FC<Props> = (props) => {
  const { social } = props;

  return (
    <div>
      <div className="flex flex-wrap mx-[-1rem] py-2">
        <div className="w-full md:w-5/12 p-4 relative z-10">
          <div className="w-[120%]">
            <span className="p-2 text-5xl font-bold text-white bg-purple leading-[74px] box-decoration-clone">
              {social.title}
            </span>
          </div>
          <div className="flex mx-[-0.5rem]">
            <div className="w-full md:w-6/12 p-2">
              <div className="flex items-center text-secondary w-full flex-nowrap">
                <CalendarIcon className="mr-2 w-6 h-6 block min-h-[1.5rem] min-w-[1.5rem]" />
                <span className="text-2xl">{timestampToDate(+social.startAt)}</span>
              </div>
            </div>
            <div className="w-full md:w-6/12 p-2">
              <div className="flex items-center text-secondary w-full flex-nowrap">
                <ClockIcon className="mr-2 w-6 h-6 block min-h-[1.5rem] min-w-[1.5rem]" />
                <span className="text-2xl">{timestampToTime(+social.startAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex mx-[-0.5rem] py-2">
            <div className="flex items-center text-secondary w-full flex-nowrap p-2">
              <LocationIcon className="mr-2 w-4 h-4 block min-h-[1rem] min-w-[1rem]" />
              <span>{social.venue}</span>
            </div>
          </div>
          <div className="flex mx-[-0.5rem]">
            <div className="w-full md:w-6/12 p-2">
              <div className="flex items-center text-secondary w-full flex-nowrap">
                <PeopleIcon className="mr-2 w-6 h-6 block min-h-[1.5rem] min-w-[1.5rem]" />
                <span>{social.capacity + (social.capacity > 1 ? "people" : "person")}</span>
              </div>
            </div>
            <div className="w-full md:w-6/12 p-2">
              <div className="flex items-center text-secondary w-full flex-nowrap">
                <MoneyIcon className="mr-2 w-6 h-6 block min-h-[1.5rem] min-w-[1.5rem]" />
                <span>$ {social.price}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-7/12 p-4 relative">
          <div className="relative h-auto overflow-hidden pt-[60%] w-full rounded-tr-[4rem] rounded-bl-[4rem] border border-dashed border-white">
            <div className="absolute max-w-full max-h-full bg-[#f2f2f219] top-0 left-0 right-0 bottom-0">
              <img src={social.banner} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-6/12 py-4">
        {(JSON.parse(social.description) as string).split("\n").map((text) => (
          <>
            <p>{text}</p>
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default SocialBlog;
