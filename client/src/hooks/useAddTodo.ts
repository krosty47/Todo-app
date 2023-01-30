import { ChangeEvent, useState } from "react";

import { Todo } from "../types";
import { Methods } from "../utils/api.utils";
import { useFieldValidation } from "./useFieldValidation";

import useInputValue from "./useInputValue";

interface InputValue {
  inputValue: string;
  changeInput: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  clearInput: () => void;
}
interface UseAddTodoProps {
  onSubmit?: (todo: Partial<Todo>, method: Methods) => Promise<void>;
}
interface UseAddTodoStore {
  title: InputValue;
  description: InputValue;
  submitValidation: string | undefined;
  handleSubmit: () => void;
  handleSubmitValidation: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const useAddTodo = ({ onSubmit }: UseAddTodoProps): UseAddTodoStore => {
  const { handleEmptyField } = useFieldValidation();
  const [submitValidation, setSubmitValidation] = useState("");
  const title = useInputValue();
  const description = useInputValue();

  const handleSubmitValidation = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSubmitValidation(event.target.value);
  };

  const handleSubmit = () => {
    const isTitleEmpty = handleEmptyField(title.inputValue, "title");
    const isDescriptionEmpty = handleEmptyField(
      description.inputValue,
      "description"
    );
    if (!isTitleEmpty && !isDescriptionEmpty) {
      onSubmit &&
        onSubmit(
          {
            title: title.inputValue,
            description: description.inputValue,
          },
          Methods.POST
        );
    }
  };
  return {
    title,
    description,
    submitValidation,
    handleSubmit,
    handleSubmitValidation,
  };
};
