"use client";

import React, { FC, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  ModalFooter,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Button as PrimaryBtn } from "../button";
import banners from "@constant/banners";
import clsx from "clsx";
import { useBanner } from "@context/BannerContext";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}
export const BannerPickerModal: FC<IModal> = (props) => {
  const { onClose, isOpen } = props;
  const { banner, setBanner } = useBanner();
  const [selected, setSelected] = useState<string>(banner);

  const save = () => {
    setBanner(selected);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose a banner</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <Flex wrap="wrap" mx="-0.5rem">
            {banners.map((banner) => (
              <div
                className={clsx(
                  "w-6/12 md:w-2/12 p-2 cursor-pointer",
                  selected === banner && "border-4 border-yellow-600",
                )}
                onClick={() => {
                  setSelected(banner);
                }}
              >
                <div className="relative w-full h-auto pt-[60%]">
                  <img
                    src={banner}
                    alt=""
                    className="absolute max-w-full max-h-full top-0 left-0 right-0 bottom-0 block object-cover m-auto"
                  />
                </div>
              </div>
            ))}
          </Flex>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
          <PrimaryBtn className="ml-2 text-white" onClick={save}>
            Save
          </PrimaryBtn>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
