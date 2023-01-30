export type CreateTodoDto = {
  title: string;
  description: string;
};

export type UpdateTodoDto = {
  id: string;
  done: boolean;
};

export type RemoveTodo = {
  id: string;
};

export type IGenericActionResponse = {
  statusCode: number;
  body: string;
};
