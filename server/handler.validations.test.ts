import { CreateTodoDto, RemoveTodo, UpdateTodoDto } from "./types";

describe("add handler", () => {
  it("Body should have title and description'", async () => {
    const createTodoDto: CreateTodoDto = {
      title: "Title",
      description: "Description",
    };
    expect(createTodoDto).toHaveProperty("title");
    expect(createTodoDto).toHaveProperty("description");
  });
});

describe("update handler", () => {
  it("Body should have title and description'", async () => {
    const updateTodoDto: UpdateTodoDto = {
      id: "1",
      done: false,
    };
    expect(updateTodoDto).toHaveProperty("id");
    expect(updateTodoDto).toHaveProperty("done");
  });
});

describe("remove handler", () => {
  it("Body should have title and description'", async () => {
    const removeTodo: RemoveTodo = {
      id: "1",
    };
    expect(removeTodo).toHaveProperty("id");
  });
});
