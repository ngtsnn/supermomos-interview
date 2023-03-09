import React, { FC } from "react";
import {
  Alert,
  AlertStatus,
  Box,
  CloseButton,
  HTMLChakraProps,
  ThemingProps,
  useDisclosure,
} from "@chakra-ui/react";

interface AlertOptions {
  /**
   * The status of the alert
   * @default "info"
   */
  status?: AlertStatus;
}

interface AlertProps extends HTMLChakraProps<"div">, AlertOptions, ThemingProps<"Alert"> {
  /**
   * @default false
   */
  addRole?: boolean;
}

export const ClosableAlert: FC<
  AlertProps & {
    isOpen: boolean;
    onClose: () => void;
  }
> = (props) => {
  const { isOpen, onClose } = props;

  return isOpen ? (
    <Alert {...props}>
      {props.children}
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <></>
  );
};
