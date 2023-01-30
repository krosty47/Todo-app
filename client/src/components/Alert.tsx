import React from "react";
import {
  Button,
  IconButton,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import { CSSProperties } from "react";
import {
  MessageType,
  ValidationColors,
  Variant,
} from "../utils/validations.utils";

export interface AlertProps {
  open: boolean;
  isOpen?: boolean;
  message: string;
  type: Variant;
  severity?: Variant;
  handleOnClose?: () => void;
  handleCloseSnackBar?: () => void;
  isMyTimeAlert?: boolean;
}

export interface SnackbarMessage {
  message: string;
}

const handleAlertStyle = (type: Variant): CSSProperties => {
  return {
    backgroundColor:
      type === MessageType.ERR0R
        ? ValidationColors.ERROR
        : type === MessageType.SUCCESS
        ? ValidationColors.SUCCESS
        : ValidationColors.WARNING,
  };
};

export const Alert = (props: AlertProps): JSX.Element => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        classes={{
          root: "snackbar",
        }}
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleOnClose}
      >
        <SnackbarContent
          style={handleAlertStyle(props.type)}
          action={
            <>
              <Button
                color="secondary"
                size="small"
                onClick={props.handleOnClose}
              >
                X
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={props.handleOnClose}
              />
            </>
          }
          message={
            <>
              <strong>{props.type}</strong> - {props.message}
            </>
          }
        />
      </Snackbar>
    </>
  );
};
