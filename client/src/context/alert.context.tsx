import React, { createContext, ReactNode, useCallback, useState } from "react";

import { Alert, AlertProps } from "../components/Alert";
import { Variant } from "../utils/validations.utils";

export interface AlertProviderStore {
  showAlert: (x: { message: string; type?: Variant }) => void;
}

const initialState: AlertProps = {
  open: false,
  message: "",
  type: "Success",
  handleOnClose: () => null,
};

export const AlertContext = createContext({} as AlertProviderStore);

const AlertProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [options, setOptions] = useState<AlertProps | undefined>(initialState);
  const hideAlert = (): void => setOptions(undefined);

  const showAlert = useCallback(
    ({ handleOnClose = hideAlert, ...params }): void => {
      if (!params.message) {
        params.message = "Unknown error";
      }
      setOptions({ open: true, handleOnClose, ...params } as AlertProps);
    },
    []
  );

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert {...(options as AlertProps)} />
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export const AlertConsumer = AlertContext.Consumer;
