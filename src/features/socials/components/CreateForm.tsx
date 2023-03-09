import React, { ChangeEvent, useRef, useState, FC } from "react";
import TitleInput from "@components/input/TitleInput";
import { BannerPicker } from "@components/input/BannerPicker";
import { InputDatePicker } from "@components/input/DatePicker";
import { InputTimePicker } from "@components/input/TimePicker";
import { Input } from "@components/input/Basic";
import { TextArea } from "@components/input/TextArea";
import {
  Badge,
  Checkbox,
  NumberInput,
  NumberInputField,
  Radio,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { tags } from "@constant/tags";
import { isMoment, Moment } from "moment";
import type { Social, SocialError } from "@interfaces/social";
import { ClosableAlert } from "@components/alert/ClosableAlert";
import { Button } from "@components/button";
import { useBanner } from "@context/BannerContext";
import socialService, { validateSocial } from "@features/socials/service/social";

import { ReactComponent as LocationIcon } from "@assets/icons/location.svg";
import { ReactComponent as PeopleIcon } from "@assets/icons/people.svg";
import { ReactComponent as MoneyIcon } from "@assets/icons/money.svg";
import { ReactComponent as XIcon } from "@assets/icons/x.svg";
import moment from "moment";

interface Props {
  setSocial: (social: Social) => void;
}

const errorMap = {
  title: "Title",
  startAt: "Start time",
  venue: "Venue",
  capacity: "Capacity",
  price: "Price",
  description: "Description",
  isManualApprove: "Approval",
  privacy: "Privacy",
  banner: "Banner",
  tags: "Tags",
};

const CreateForm: FC<Props> = (props) => {
  const { setSocial } = props;
  const { banner } = useBanner();
  const [socialErr, setSocialErr] = useState<SocialError>();
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | Moment>(moment(new Date()));
  const [privacy, setPrivacy] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [unselectedTags, setUnselectedTags] = useState<string[]>(tags);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);
  const capacityRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const approvalRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { isOpen: isOpenAlert, onClose: closeAlert, onOpen: openAlert } = useDisclosure();

  const updatePrivacy = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivacy(e.target.value);
  };

  const addTags = (_tag: string) => {
    let hasTag = false;
    const unselected = unselectedTags.filter((tag) => {
      if (tag === _tag) {
        hasTag = true;
        return false;
      }
      return true;
    });
    setUnselectedTags(unselected);
    if (hasTag) {
      setSelectedTags([...selectedTags, _tag]);
    }
  };

  const removeTags = (_tag: string) => {
    let hasTag = false;
    const selected = selectedTags.filter((tag) => {
      if (tag === _tag) {
        hasTag = true;
        return false;
      }
      return true;
    });
    setSelectedTags(selected);
    if (hasTag) {
      setUnselectedTags([...unselectedTags, _tag]);
    }
  };

  const onSubmit = async () => {
    console.log(JSON.stringify(descriptionRef.current?.value));
    try {
      let datetimeErr = "";
      let timestamp = Date.now();
      if (date && isMoment(time)) {
        const h = time.hour();
        const m = time.minute();
        const s = time.seconds();
        const additionalTime = (h * 3600 + m * 60 + s) * 1000;
        timestamp = +date + additionalTime;
      } else {
        datetimeErr = "please select a date";
      }
      const social: Social = {
        banner,
        capacity: capacityRef.current ? +capacityRef.current.value : 0,
        description: JSON.stringify(descriptionRef.current?.value || ""),
        privacy,
        startAt: timestamp.toString(),
        tags: selectedTags,
        title: titleRef.current?.value || "",
        venue: venueRef.current?.value || "",
        isManualApprove: approvalRef.current?.checked || false,
        price: priceRef.current ? +priceRef.current.value : 0,
      };
      const validateErr = validateSocial(social);
      if (datetimeErr) validateErr.startAt = datetimeErr;
      const hasErr = Object.keys(validateErr).some((key) => !!(validateErr as any)[key]);
      if (hasErr) {
        setSocialErr(validateErr);
        toast({
          title: "Incompleted form",
          description: "Please fullfil the form to create the social",
          status: "error",
        });
        openAlert();
        if (typeof window != "undefined") {
          scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      } else {
        const res = await socialService.createSocial(social);
        setSocial(res.data);
        toast({
          title: "Created social successfully",
          description: "You've created your social successfully.",
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Opps!",
        description: "Something wrong with the server",
        status: "error",
      });
    }
  };

  return (
    <div>
      {socialErr && (
        <ClosableAlert
          status="error"
          rounded="lg"
          bgColor="#feb2b28a"
          isOpen={isOpenAlert}
          onClose={closeAlert}
        >
          <ul className="block w-full text-red-700">
            {Object.keys(socialErr).map((err) => (
              <li key={err}>
                {(errorMap as any)[err]}: {(socialErr as any)[err]}
              </li>
            ))}
          </ul>
        </ClosableAlert>
      )}
      <div className="flex flex-wrap mx-[-1rem] py-2">
        <div className="w-full md:w-5/12 p-4">
          <TitleInput ref={titleRef} />
          <div className="flex mx-[-0.5rem]">
            <div className="w-full md:w-6/12 p-2">
              <InputDatePicker date={date} setDate={setDate} />
            </div>
            <div className="w-full md:w-6/12 p-2">
              <InputTimePicker time={time} setTime={(_time) => isMoment(_time) && setTime(_time)} />
            </div>
          </div>
          <div className="flex mx-[-0.5rem] py-2">
            <div className="flex items-center text-secondary w-full flex-nowrap p-2">
              <LocationIcon className="mr-2 w-6 h-6 block min-h-[1.5rem] min-w-[1.5rem]" />
              <Input className="w-full h-10" placeholder="Venue" ref={venueRef} />
            </div>
          </div>
          <div className="flex mx-[-0.5rem]">
            <div className="w-full md:w-6/12 p-2">
              <div className="flex items-center text-secondary w-full flex-nowrap">
                <PeopleIcon className="mr-2 w-6 h-6 block min-h-[1.5rem] min-w-[1.5rem]" />
                <Input
                  className="w-full text-sm h-10"
                  placeholder="Max capacity"
                  ref={capacityRef}
                  onChange={(e) => {
                    const val = e.target.value;
                    e.target.value = val.replace(/[^0-9]/g, "");
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-6/12 p-2">
              <div className="flex items-center text-secondary w-full flex-nowrap">
                <MoneyIcon className="mr-2 w-6 h-6 block min-h-[1.5rem] min-w-[1.5rem]" />
                <NumberInput min={0} clampValueOnBlur={true} w="full" shadow="none">
                  <NumberInputField
                    bg="white"
                    outline="none"
                    ref={priceRef}
                    fontWeight="bold"
                    border="none"
                    shadow="none"
                    className="p-0.5 placeholder:font-bold placeholder:text-black"
                    px="1"
                    placeholder="Cost per person"
                  />
                </NumberInput>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-7/12 p-4">
          <BannerPicker />
        </div>
      </div>
      <div className="w-full md:w-6/12 py-4">
        <label htmlFor="description" className="block text-sm">
          Description
        </label>
        <TextArea
          id="description"
          className="w-full resize-none p-2 px-2"
          rows={8}
          placeholder="Description of your event..."
          ref={descriptionRef}
        />
      </div>
      <div className="py-2">
        <div className="w-full md:w-6/12 p-2 bg-white rounded-lg">
          <h3 className="text-purple bg-yellow inline-block px-3 py-1 text-4xl font-extrabold">
            Settings
          </h3>
          <div className="py-3 flex items-center">
            <Checkbox id="approve" className="mr-2" ref={approvalRef} />
            <label htmlFor="approve" className="cursor-pointer">
              I want to approve attendees
            </label>
          </div>
          <div className="py-3">
            <label className="cursor-pointer block font-bold">Privacy</label>
            <div className="flex flex-wrap mx-[-0.75rem]">
              <Radio
                name="privacy"
                className="ml-3"
                onChange={updatePrivacy}
                value="Public"
                isChecked={privacy === "Public"}
              >
                Public
              </Radio>
              <Radio
                name="privacy"
                className="ml-3"
                onChange={updatePrivacy}
                value="Curated Audience"
                isChecked={privacy === "Curated Audience"}
              >
                Curated Audience
              </Radio>
              <Radio
                name="privacy"
                className="ml-3"
                onChange={updatePrivacy}
                value="Community Only"
                isChecked={privacy === "Community Only"}
              >
                Community Only
              </Radio>
            </div>
          </div>

          <div className="py-3">
            <label className="cursor-pointer block font-bold">Tag your social</label>
            <div>Pick tags for our curation engine to work its magin</div>
            <div className="flex mx-[-0.5rem] py-2">
              {selectedTags.map((tag) => (
                <div className="p-2" key={tag}>
                  <Badge
                    rounded="xl"
                    px="2"
                    py="0.5"
                    cursor="pointer"
                    onClick={() => removeTags(tag)}
                    display="flex"
                    alignItems="center"
                  >
                    <span className="mr-1 text-purple">{tag}</span>
                    <XIcon className="relative bottom-[1px]" />
                  </Badge>
                </div>
              ))}
            </div>
            <div className="flex mx-[-0.5rem] py-2">
              {unselectedTags.map((tag) => (
                <div className="p-2" key={tag}>
                  <Badge rounded="xl" px="2" py="0.5" cursor="pointer" onClick={() => addTags(tag)}>
                    {tag}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-6/12 py-2">
        <Button
          type="submit"
          className="w-full flex justify-center font-bold text-purple"
          onClick={onSubmit}
        >
          CREATE SOCIAL
        </Button>
      </div>
    </div>
  );
};

export default CreateForm;
