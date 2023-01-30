// We have to do a contract between the back-end and front-end. So we can validate the interfaces.
// I used to work with monorepos, maybe we can have a COMMON folder that share Dtos between back and front. There is others ways to do it.

import { Methods } from "../utils/api.utils";

export type Todo = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export type IGenericActionResponse = {
  success: boolean;
  item: Todo;
};

export type BodyRequest = {
  method: Methods;
  body: string;
  headers: Headers;
};

type Headers = {
  "Content-type": string;
};
