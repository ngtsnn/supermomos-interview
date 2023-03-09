import React, { FC } from "react";
import { ReactComponent as ImgIcon } from "@assets/icons/img.svg";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { BannerPickerModal } from "@components/modal/BannerPickerModal";
import styles from "./style.module.scss";
import clsx from "clsx";
import { Button } from "@components/button";
import { useBanner } from "@context/BannerContext";

export const BannerPicker: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { banner } = useBanner();

  return (
    <>
      <div className="w-full relative">
        <div
          className={clsx(
            "relative h-auto overflow-hidden pt-[60%] w-full rounded-tr-[4rem] rounded-bl-[4rem] border border-dashed border-white",
            styles.img,
          )}
        >
          {banner ? (
            <>
              <div className="absolute max-w-full max-h-full bg-[#f2f2f219] top-0 left-0 right-0 bottom-0">
                <img src={banner} alt="" />
              </div>
              <Flex
                className={styles.modifier}
                alignItems="center"
                justify="center"
                width="full"
                height="full"
                bg="#f2f2f256"
              >
                <Button className="text-white" onClick={onOpen}>
                  <ImgIcon width={16} height={16} />
                  <span className="ml-2">Change the banner</span>
                </Button>
              </Flex>
            </>
          ) : (
            <div
              className="absolute max-w-full max-h-full bg-[#f2f2f219] top-0 left-0 right-0 bottom-0 flex items-center justify-center text-secondary cursor-pointer hover:bg-[#f2f2f256] hover:font-bold"
              onClick={onOpen}
            >
              <ImgIcon width={16} height={16} />
              <span className="ml-2">Add a banner</span>
            </div>
          )}
        </div>
        <div className=""></div>
      </div>
      {isOpen && <BannerPickerModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};
