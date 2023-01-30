import { IGenericActionResponse, Todo } from "../types";
import { apiMutation, Methods } from "../utils/api.utils";

export const getTodos = async (): Promise<Todo[]> => {
  return await (await fetch("http://localhost:4000/todos")).json();
};

export const addTodo = async (
  todo: Partial<Todo>,
  method: Methods
): Promise<IGenericActionResponse> => {
  return apiMutation(todo, method);
};

export const updateTodo = async (
  todo: Partial<Todo>,
  method: Methods
): Promise<IGenericActionResponse> => {
  return apiMutation(todo, method);
};

export const removeTodo = async (
  id: string,
  method: Methods
): Promise<IGenericActionResponse> => {
  return apiMutation({ id }, method);
};
