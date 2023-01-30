import { ChangeEvent, useState } from "react";

interface InputValueStore {
  inputValue: string;
  changeInput: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  clearInput: () => void;
}

const useInputValue = (initialValue = ""): InputValueStore => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setInputValue(event.target.value);
    },
    clearInput: () => setInputValue(""),
  };
};

export default useInputValue;
