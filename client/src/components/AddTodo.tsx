import { TextField, Paper, Button, Grid } from "@material-ui/core";

import React, { ChangeEvent } from "react";

import { useAddTodo } from "../hooks/useAddTodo";
import { Todo } from "../types";
import { Methods } from "../utils/api.utils";

interface AddTodoProps {
  onSubmit?: (todo: Partial<Todo>, method: Methods) => Promise<void>;
}
const AddTodo = (props: AddTodoProps) => {
  const {
    title,
    description,
    submitValidation,
    handleSubmit,
    handleSubmitValidation,
  } = useAddTodo({
    onSubmit: props.onSubmit,
  });

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={3} item style={{ paddingRight: 16 }}>
          <TextField
            inputProps={{
              "data-testid": "title",
            }}
            placeholder="Add Todo Title here"
            value={title.inputValue}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              title.changeInput(event);
              handleSubmitValidation(event);
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={10} md={8} item style={{ paddingRight: 16 }}>
          <TextField
            inputProps={{
              "data-testid": "description",
            }}
            placeholder="Add Todo Description here"
            value={description.inputValue}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              description.changeInput(event);
              handleSubmitValidation(event);
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            data-testid="button"
            fullWidth
            color="secondary"
            variant="outlined"
            disabled={submitValidation ? false : true}
            onClick={() => {
              handleSubmit();
              title.clearInput();
              description.clearInput();
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddTodo;
