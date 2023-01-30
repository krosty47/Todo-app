import { BodyRequest, IGenericActionResponse, Todo } from "../types";

export const Headers = {
  "Content-type": "application/json; charset=UTF-8",
};
export enum Methods {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const bodyRequest = (
  method: Methods,
  body: Partial<Todo>
): BodyRequest => {
  return {
    method,
    body: JSON.stringify(body),
    headers: Headers,
  };
};

export const apiMutation = async (
  todo: Partial<Todo>,
  method: Methods
): Promise<IGenericActionResponse> => {
  const response = await fetch(
    "http://localhost:4000/todos",
    bodyRequest(method, todo)
  );

  const jsonResponse = await response.json();
  return jsonResponse;
};
