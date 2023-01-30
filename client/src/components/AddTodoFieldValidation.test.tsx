import { render, getByTestId, fireEvent } from "@testing-library/react";
import React from "react";
import AddTodo from "./AddTodo";

describe("AddTodo component", () => {
  it("should enable submit button when both title and description are filled in", async () => {
    const { getByTestId } = render(<AddTodo />);
    const titleInput = getByTestId("title");
    const descriptionInput = getByTestId("description");
    const submitButton = getByTestId("button");

    await fireEvent.change(titleInput, { target: { value: "Test Title" } });
    await fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });

    expect(submitButton).not.toBeDisabled();
  });

  it("should disable submit button when either title or description is empty", async () => {
    const { getByTestId } = render(<AddTodo />);
    const titleInput = getByTestId("title");
    const descriptionInput = getByTestId("description");
    const submitButton = getByTestId("button");

    await fireEvent.change(titleInput, { target: { value: "" } });
    await fireEvent.change(descriptionInput, { target: { value: "" } });

    expect(submitButton).toBeDisabled();
  });
});
