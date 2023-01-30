import React, { MouseEventHandler } from "react";

import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

interface TodoListItemProps {
  divider: boolean | undefined;
  done: boolean;
  title: string;
  description: string;
  onCheckBoxToggle: MouseEventHandler<HTMLButtonElement>;
  onButtonClick: () => void;
}

const TodoListItem = ({
  divider,
  onCheckBoxToggle,
  done,
  title,
  description,
  onButtonClick,
}: TodoListItemProps) => {
  return (
    <ListItem divider={divider}>
      <Checkbox
        data-testid="update"
        onClick={onCheckBoxToggle}
        checked={done}
        disableRipple
      />
      <ListItemText primary={title} secondary={description} />
      <ListItemSecondaryAction>
        <IconButton
          data-testid="remove"
          aria-label="Delete Todo"
          onClick={onButtonClick}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default TodoListItem;
