import { useContext } from "react";

import { AlertContext } from "../context/alert.context";
import { MessageType, validationMessage } from "../utils/validations.utils";

interface UseFieldValidationStore {
  handleEmptyField: (field: string, MessageNameType: string) => boolean;
}

export const useFieldValidation = (): UseFieldValidationStore => {
  const alertContext = useContext(AlertContext);

  const handleEmptyField = (field: string, name: string) => {
    if (field.trim().length !== 0) {
      return false;
    } else {
      alertContext.showAlert({
        message: validationMessage(MessageType.ERR0R, name),
        type: MessageType.ERR0R,
      });
      return true;
    }
  };
  return { handleEmptyField };
};
