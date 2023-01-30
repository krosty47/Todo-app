import { useState, useEffect, useContext, useCallback } from "react";

import { getTodos, addTodo, updateTodo, removeTodo } from "../api";
import { AlertContext } from "../context/alert.context";
import { Todo } from "../types";
import { Methods } from "../utils/api.utils";
import {
  httpStatusError,
  MessageType,
  validationMessage,
} from "../utils/validations.utils";

const useTodos = (initialValue?: Todo[]) => {
  const [todos, setTodos] = useState<Todo[] | undefined>(initialValue);
  const alertContext = useContext(AlertContext);

  const handleGetTodos = useCallback(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        alertContext.showAlert({
          message: httpStatusError(MessageType.ERR0R, error as string),
          type: MessageType.ERR0R,
        });
      });
  }, [alertContext]);

  const handleAddTodo = useCallback(
    async (todo: Partial<Todo>, method: Methods) => {
      try {
        await addTodo(todo, method);
        handleGetTodos();
        alertContext.showAlert({
          message: validationMessage(MessageType.SUCCESS, "todo"),
          type: MessageType.SUCCESS,
        });
      } catch (error) {
        alertContext.showAlert({
          message: httpStatusError(MessageType.ERR0R, error as string),
          type: MessageType.ERR0R,
        });
      }
    },
    [alertContext, handleGetTodos]
  );

  const updateAdapter = useCallback((todo: Partial<Todo>) => {
    return {
      id: todo.id,
      done: !todo.done,
    };
  }, []);

  const handleUpdateTodo = useCallback(
    async (todo: Partial<Todo>, method: Methods) => {
      try {
        await updateTodo(updateAdapter(todo), method);
        handleGetTodos();
        alertContext.showAlert({
          message: "Todo was updated successfully",
          type: "Success",
        });
      } catch (error) {
        alertContext.showAlert({
          message: httpStatusError(MessageType.ERR0R, error as string),
          type: MessageType.ERR0R,
        });
      }
    },
    [alertContext, handleGetTodos, updateAdapter]
  );

  const handleDeleteTodo = useCallback(
    async (id: string, method: Methods) => {
      try {
        await removeTodo(id, method);
        handleGetTodos();
        alertContext.showAlert({
          message: "Todo was removed successfully",
          type: "Success",
        });
      } catch (error) {
        alertContext.showAlert({
          message: httpStatusError(MessageType.ERR0R, error as string),
          type: MessageType.ERR0R,
        });
      }
    },
    [alertContext, handleGetTodos]
  );

  useEffect(() => {
    handleGetTodos();
  }, [handleGetTodos]);

  return {
    todos,
    addTodo: handleAddTodo,
    updateTodo: handleUpdateTodo,
    removeTodo: handleDeleteTodo,
  };
};

export default useTodos;
