import { List, Paper } from "@material-ui/core";

import React from "react";

import TodoListItem from "./TodoListItem";
import { Todo } from "../types";
import { Methods } from "../utils/api.utils";

interface TodoListProps {
  items: Todo[];
  onItemUpdate: (todo: Partial<Todo>, method: Methods) => void;
  onItemRemove: (id: string, method: Methods) => void;
}
const TodoList = ({ items, onItemUpdate, onItemRemove }: TodoListProps) => (
  <>
    {items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: "scroll" }} data-testid="todos">
          {items.map((todo: Todo, idx: number) => (
            <TodoListItem
              {...todo}
              key={todo.id}
              divider={idx !== items.length - 1}
              onButtonClick={() => {
                onItemRemove(todo.id, Methods.DELETE);
              }}
              onCheckBoxToggle={() => {
                onItemUpdate(todo, Methods.PUT);
              }}
              done={todo.done}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
);

export default TodoList;
